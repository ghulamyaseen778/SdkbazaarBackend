import jsonwebtoken from "jsonwebtoken";
import User, { Otp } from "../Models/UserSchema.js";
import { errHandler, responseHandler } from "../helper/response.js";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "muhammadyaseen3294@gmail.com",
    pass: process.env.PASS,
  },
});

const sendMail = (to, data, id) => {
  let html = `<body style="font-family: Helvetica, Arial, sans-serif; margin: 0px; padding: 0px; background-color: #ffffff;">
<table role="presentation"
  style="width: 100%; border-collapse: collapse; border: 0px; border-spacing: 0px; font-family: Arial, Helvetica, sans-serif; background-color: rgb(239, 239, 239);">
  <tbody>
    <tr>
      <td align="center" style="padding: 1rem 2rem; vertical-align: top; width: 100%;">
        <table role="presentation" style="max-width: 600px; border-collapse: collapse; border: 0px; border-spacing: 0px; text-align: left;">
          <tbody>
            <tr>
              <td style="padding: 40px 0px 0px;">
                <div style="text-align: left;">
                  <div style="padding-bottom: 20px;"><div style="border-bottom:1px solid #eee">
                  <a href="" style="font-size:1.4em;color: 
                  rgba(252, 36, 105, 1);text-decoration:none;font-weight:600">SDK App</a>
                </div></div>
                </div>
                <div style="padding: 20px; background-color: rgb(255, 255, 255);">
                  <div style="color: rgb(0, 0, 0); text-align: left;">
                    <h1 style="margin: 1rem 0">Verification code</h1>
                    <p style="padding-bottom: 16px">${data.name} Thank you for choosing SDK App. Use the following OTP to complete your Registration procedures</p>
                    <h2 style="background: rgba(252, 36, 105, 0.6);margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">SDK-${data.otp}</h2>
                    <p style="padding-bottom: 16px">If you didn’t request this, you can ignore this email.</p>
                    <p style="padding-bottom: 16px">Thanks,<br>The SDK App team</p>
                  </div>
                </div>
                
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  </tbody>
</table>
</body>`;
  return {
    from: "muhammadyaseen3294@gmail.com",
    to: to,
    subject: "These was recived by SDK App || Please verify your self",
    html: html,
  };
};

const RegisterdUser = async (req, res) => {
  let { name, email, password, phoneNumber } = req.body;
  console.log(req.body, "body:");
  if (User && (await User.findOne({ email }))) {
    errHandler(res, 1, 403);
    return;
  }
  if (password?.trim().length < 8) {
    errHandler(res, 2, 403);
    return;
  }
  if (name?.trim().length < 3) {
    errHandler(res, 3, 403);
    return;
  }

  User.create({
    name,
    email,
    password,
    phoneNumber,
  })
    .then((data) => {
      let { name, email, phoneNumber, _id, createdAt, role, verified } = data;
      let token = jsonwebtoken.sign(
        {
          name,
          email,
          _id,
          createdAt,
          role,
          phoneNumber,
          verified,
        },
        process.env.SECRET_KEY
      );
      const otp = Math.floor(1000 + Math.random() * 9000);
      console.log(otp)
      transporter.sendMail(
        sendMail(email, { name, otp }, _id),
        async (error, info) => {
          if (error) {
            console.log("Error occurred:", error.message);
          } else {
            console.log(info);
              Otp.create({ userId: _id, otp: otp }).then((otpIS)=>{
                console.log("otpIS:",otpIS)
              }).catch((err) => {
                errHandler(res, "Otp Not created", 409);
                console.log(err);
              });
            
          }
        }
      );
      responseHandler(res, {
        name,
        email,
        _id,
        createdAt,
        token,
        phoneNumber,
        role,
        verified,
      });
    })
    .catch((err) => {
      errHandler(res, 5, 409);
      console.log(err);
    });
};

const LoginUser = async (req, res) => {
  let { email, password } = req.body;
  if (password.trim().length < 8) {
    errHandler(res, 2, 403);
    return;
  }
  User.findOne({ email, password })
    .then(async (data) => {
      let { name, email, phoneNumber, _id, createdAt, role, verified } = data;
      if (verified) {
        let token = jsonwebtoken.sign(
          {
            name,
            email,
            phoneNumber,
            _id,
            createdAt,
            role,
            verified,
          },
          process.env.SECRET_KEY
        );
        responseHandler(res, {
          name,
          email,
          _id,
          createdAt,
          token,
          phoneNumber,
          role,
          verified,
        });
      } else {
        let token = jsonwebtoken.sign(
          {
            name,
            email,
            phoneNumber,
            _id,
            createdAt,
            role,
            verified,
          },
          process.env.SECRET_KEY
        );
        const otp = Math.floor(1000 + Math.random() * 9000);
        console.log(otp)
         transporter.sendMail(
          sendMail(email, { name, otp }, _id),
          async (error, info) => {
            if (error) {
              console.log("Error occurred:", error.message);
            } else {
              console.log(info);
              await Otp.create({ userId: _id, otp: otp });
            }
          }
        );
        responseHandler(res, {
          name,
          email,
          _id,
          createdAt,
          token,
          phoneNumber,
          role,
          verified,
        });
      }
    })
    .catch((err) => {
      errHandler(res, 5, 409);
    });
};
const MakeVendor = (req, res) => {
  const user = req.user;
  const { role } = req.body;
  User.findByIdAndUpdate({ _id: user._id }, { role: role }, { new: true })
    .then((data) => {
      responseHandler(res, data);
    })
    .catch((err) => {
      errHandler(res, 5, 409);
    });
};

const ForgotPassword = async (req, res) => {
  const { email } = req.body;
  console.log(email);
  if (!email) {
    errHandler(res, "Account Was Not Found", 403);
    return;
  }

  User.findOne({ email }).then((userData) => {
    const otp = Math.floor(1000 + Math.random() * 9000);
    // sendMail(email, { name: userData.name, otp }, userData._id);
    transporter.sendMail(
      sendMail(email, { name:userData.name, otp }, userData._id),
      async (error, info) => {
        if (error) {
          console.log("Error occurred:", error.message);
        } else {
          console.log(info);
          await Otp.create({ userId: userData._id, otp: otp });
        }
      }
    );
    User.findByIdAndUpdate(
      { _id: userData._id },
      { verified: false },
      { new: true }
    )
      .then((data) => {
        let { name, email, phoneNumber, _id, createdAt, role, verified } = data;
        let token = jsonwebtoken.sign(
          {
            name,
            email,
            _id,
            createdAt,
            role,
            phoneNumber,
            verified,
          },
          process.env.SECRET_KEY
        );
        responseHandler(res, {
          name,
          email,
          phoneNumber,
          _id,
          createdAt,
          role,
          verified,
          token,
        });
      })
      .catch((err) => {
        errHandler(res, 5, 409);
      });
  });
};
const NewPassword = async (req, res) => {
  const { password } = req.body;
  const user = req.user;
  console.log(password);
  if (!password) {
    errHandler(res, "Password Has Not Changed", 403);
    return;
  }
  if (password?.trim().length < 8) {
    errHandler(res, 2, 403);
    return;
  }
  User.findByIdAndUpdate({ _id: user._id }, { password }, { new: true }).then(
    (data) => {
      let { name, email, phoneNumber, _id, createdAt, role, verified } = data;
      let token = jsonwebtoken.sign(
        {
          name,
          email,
          _id,
          createdAt,
          role,
          phoneNumber,
          verified,
        },
        process.env.SECRET_KEY
      );
      responseHandler(res, {
        name,
        email,
        phoneNumber,
        _id,
        createdAt,
        role,
        verified,
        token,
      });
    }
  );
};

const VerifyOtp = (req, res) => {
  const user = req.user;
  const { otp } = req.body;
  console.log(otp,"dw");

  Otp.find({ userId: user._id })
    .then((dataotp) => {
      console.log(dataotp,"dd");
      if (otp == dataotp[0].otp) {
        User.findByIdAndUpdate(
          { _id: user._id },
          { verified: true },
          { new: true }
        )
          .then((data) => {
            let { name, email, phoneNumber, _id, createdAt, role, verified } =
              data;
            let token = jsonwebtoken.sign(
              {
                name,
                email,
                _id,
                createdAt,
                role,
                phoneNumber,
                verified,
              },
              process.env.SECRET_KEY
            );
            responseHandler(res, {
              name,
              email,
              phoneNumber,
              _id,
              createdAt,
              role,
              verified,
              token,
            });
            Otp.findByIdAndDelete(dataotp[0]._id)
              .then((datao) => {
                console.log(datao);
              })
              .catch((err) => {
                console.log(err);
              });
          })
          .catch((err) => {
            errHandler(res, 5, 409);
          });
      } else {
        errHandler(res, "Invalid Otp", 409);
      }
    })
    .catch(() => {
      errHandler(res, 5, 409);
    });
};

export {
  RegisterdUser,
  LoginUser,
  MakeVendor,
  VerifyOtp,
  ForgotPassword,
  NewPassword,
};
