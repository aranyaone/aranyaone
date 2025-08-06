import { NextResponse } from 'next/server';
import { companyInfo, testimonials, pressReleases } from '../../../data/company-info';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const section = searchParams.get('section');

    // Return specific section if requested
    if (section) {
      switch (section) {
        case 'founder':
          return NextResponse.json({
            success: true,
            data: companyInfo.founder
          });
        case 'statistics':
          return NextResponse.json({
            success: true,
            data: companyInfo.statistics
          });
        case 'testimonials':
          return NextResponse.json({
            success: true,
            data: testimonials
          });
        case 'press':
          return NextResponse.json({
            success: true,
            data: pressReleases
          });
        case 'contact':
          return NextResponse.json({
            success: true,
            data: companyInfo.contact
          });
        default:
          return NextResponse.json({
            success: false,
            error: 'Invalid section requested'
          }, { status: 400 });
      }
    }

    // Return full company information
    return NextResponse.json({
      success: true,
      data: {
        company: companyInfo,
        testimonials,
        pressReleases,
        lastUpdated: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('Company info API error:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch company information'
    }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    const { action, ...payload } = data;

    switch (action) {
      case 'contact':
        // Handle contact form submission
        return NextResponse.json({
          success: true,
          message: 'Thank you for your message. Our team will get back to you within 24 hours.',
          ticketId: `TICKET-${Date.now()}`
        });

      case 'newsletter':
        // Handle newsletter subscription
        return NextResponse.json({
          success: true,
          message: 'Successfully subscribed to our newsletter!'
        });

      case 'demo_request':
        // Handle demo request
        return NextResponse.json({
          success: true,
          message: 'Demo request received. We will contact you within 2 business hours.',
          demoId: `DEMO-${Date.now()}`
        });

      default:
        return NextResponse.json({
          success: false,
          error: 'Invalid action'
        }, { status: 400 });
    }

  } catch (error) {
    console.error('Company info POST error:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to process request'
    }, { status: 500 });
  }
}
