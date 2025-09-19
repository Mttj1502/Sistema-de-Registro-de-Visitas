import { NextResponse } from "next/server";
import { getConnection } from "../db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const SECRET = "securiti_secret_key"; // Cambia por una clave segura en producción

export async function POST(request) {
  const data = await request.json();
  if (!data.usuario || !data.clave) {
    return NextResponse.json({ mensaje: "Usuario y clave obligatorios" }, { status: 400 });
  }
  try {
    const conn = await getConnection();
    const [rows] = await conn.execute(
      "SELECT * FROM usuarios WHERE usuario = ?",
      [data.usuario]
    );
    await conn.end();
    if (rows.length === 0) {
      return NextResponse.json({ mensaje: "Usuario no encontrado" }, { status: 404 });
    }
    const usuario = rows[0];
    const valido = await bcrypt.compare(data.clave, usuario.clave);
    if (!valido) {
      return NextResponse.json({ mensaje: "Clave incorrecta" }, { status: 401 });
    }
    const token = jwt.sign({ id: usuario.id, rol: usuario.rol, nombre: usuario.nombre }, SECRET, { expiresIn: "8h" });
    return NextResponse.json({ mensaje: "Login exitoso", token, usuario: { id: usuario.id, nombre: usuario.nombre, rol: usuario.rol } });
  } catch (error) {
    return NextResponse.json({ mensaje: "Error en la base de datos", error: error.message }, { status: 500 });
  }
}
