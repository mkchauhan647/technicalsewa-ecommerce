

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import axios from 'axios';

export async function POST(req: NextRequest,res: NextResponse) {
    // Determine if the request is for a proxied route

    // console.log('req.nextUrl.pathname', req.nextUrl.pathname);

    // console.log('req.body', await req.json());
    const id = await req.json();

    // Construct the external URL
    const externalUrl = `https://www.technicalsewa.com/techsewa/publiccontrol/publicsales/getsalesparts`;

    try {
        const response = await fetch(externalUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `sales_id=${id.sales_id}`,
            
        
        });

        const data = await response.json();
        // console.log('response', data);

        // Forward the response from the external API to the client
        return NextResponse.json(data, { status: response.status });
    } catch (error: any) {
        console.error('Error fetching data:', error.message);
        return NextResponse.json({ message: error.message }, { status: error.response?.status || 500 });
    }

    // Let other requests pass through
    // return NextResponse.next();
}