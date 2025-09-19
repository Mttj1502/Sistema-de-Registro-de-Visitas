import { NextResponse } from "next/server";
import { getConnection } from "../db";
import { enviarCorreo } from "../correo";

export async function POST(request) {
  const data = await request.json();
  if (!data.nombre || !data.empresa || !data.correo || !data.motivo) {
    return NextResponse.json({ mensaje: "Todos los campos son obligatorios" }, { status: 400 });
  }
  try {
    const conn = await getConnection();
    await conn.execute(
      "INSERT INTO visitas (nombre, empresa, correo, motivo, fecha, usuario_id) VALUES (?, ?, ?, ?, NOW(), ?)",
      [data.nombre, data.empresa, data.correo, data.motivo, data.usuario_id || null]
    );
    // Auditoría
    if (data.usuario_id) {
      await conn.execute(
        "INSERT INTO auditoria (usuario_id, accion, fecha) VALUES (?, ?, NOW())",
        [data.usuario_id, `Registro de visita: ${data.nombre}`]
      );
    }
    await conn.end();
    // Notificación por correo
    await enviarCorreo({
      to: data.correo,
      subject: "Registro de visita Securiti",
      text: `Hola ${data.nombre}, tu visita ha sido registrada exitosamente.`
    });
    return NextResponse.json({ mensaje: "Visita registrada exitosamente" });
  } catch (error) {
    return NextResponse.json({ mensaje: "Error en la base de datos", error: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    const conn = await getConnection();
    const [rows] = await conn.execute("SELECT * FROM visitas ORDER BY fecha DESC");
    await conn.end();
    return NextResponse.json(rows);
  } catch (error) {
    return NextResponse.json({ mensaje: "Error en la base de datos", error: error.message }, { status: 500 });
  }
}
