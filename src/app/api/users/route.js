import { dbConnection } from "../../mongodb";
import User from "../../../../models/User";
import { NextResponse } from "next/server";

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    try {
        await dbConnection();
        const user = await User.findById(id);

        if (!user) {
            return NextResponse.json({ error: 'user not found' }, { status: 404 });
        }

        return NextResponse.json(user, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
