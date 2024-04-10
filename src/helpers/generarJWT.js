import jwt from "jsonwebtoken";
import "dotenv/config";

const generarJWT = async (uid, email) => {
  try {
    const payload = { uid, email };
    const token = await jwt.sign(payload, process.env.SECRET_JWT, {
      expiresIn: "3h",
    });

    return token;
  } catch (error) {
    console.log("Error al generar el Token:", error.message);
    throw new Error("No se pudo generar el Token");
  }
};

export default generarJWT;