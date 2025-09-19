import { NextResponse } from "next/server";
import { getConnection } from "../db";

import bcrypt from "bcryptjs";
export async function GET() {
  try {
    const conn = await getConnection();
    const [rows] = await conn.execute("SELECT id, usuario, nombre, rol FROM usuarios");
    await conn.end();
    return NextResponse.json(rows);
  } catch (error) {
    return NextResponse.json([], { status: 500 });
  }
}

export async function POST(request) {
  const data = await request.json();
  if (!data.usuario || !data.clave || !data.nombre || !data.rol) {
    return NextResponse.json({ mensaje: "Todos los campos son obligatorios" }, { status: 400 });
  }
  try {
    const conn = await getConnection();
    const hash = await bcrypt.hash(data.clave, 10);
    await conn.execute(
      "INSERT INTO usuarios (usuario, clave, nombre, rol) VALUES (?, ?, ?, ?)",
      [data.usuario, hash, data.nombre, data.rol]
    );
    await conn.end();
    return NextResponse.json({ mensaje: "Usuario registrado exitosamente" });
  } catch (error) {
    return NextResponse.json({ mensaje: "Error en la base de datos", error: error.message }, { status: 500 });
  }
}
