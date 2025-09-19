import { NextResponse } from "next/server";
import { getConnection } from "../db";

export async function GET() {
  try {
    const conn = await getConnection();
    const [rows] = await conn.execute("SELECT a.id, u.usuario, a.accion, a.fecha FROM auditoria a JOIN usuarios u ON a.usuario_id = u.id ORDER BY a.fecha DESC");
    await conn.end();
    return NextResponse.json(rows);
  } catch (error) {
    return NextResponse.json({ mensaje: "Error en la base de datos", error: error.message }, { status: 500 });
  }
}
