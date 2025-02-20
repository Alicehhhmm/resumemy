import { NextResponse } from "next/server";

/**
 * 定义Api路由数据请求方法, 供cache使用
 * @api {get} /api/demo/
 */

export async function GET(req: Request) {
    try {

        // 开发环境模拟数据
        const result = {
            code: 200,
            data: {

            }
        }

        return NextResponse.json(result)
    } catch (error) {
        console.log('[DEMO_GET_ERRPR]' + error);
        return new NextResponse("Internal Error", { status: 500 })
    }
};