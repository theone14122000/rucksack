import { NextRequest, NextResponse } from "next/server";
import { verifyAdminSession } from "../../../lib/auth";
import {
  upsertDestination,
  deleteDestination,
  upsertPackage,
  deletePackage,
  upsertTrek,
  deleteTrek,
  upsertExperience,
  deleteExperience,
  upsertTestimonial,
  deleteTestimonial,
  upsertFAQ,
  deleteFAQ,
  updateEnquiryStatus,
  deleteEnquiry,
  updateSiteSettings,
} from "../../../lib/cms/store";

export async function POST(req: NextRequest) {
  const isAdmin = await verifyAdminSession();
  if (!isAdmin) {
    return NextResponse.json({ error: "Unauthorized access." }, { status: 401 });
  }

  try {
    const { action, type, payload } = await req.json();

    switch (type) {
      case "destination": {
        if (action === "upsert") {
          const res = await upsertDestination(payload);
          return NextResponse.json({ success: true, item: res });
        }
        if (action === "delete") {
          const res = await deleteDestination(payload.id);
          return NextResponse.json({ success: res });
        }
        break;
      }
      case "package": {
        if (action === "upsert") {
          const res = await upsertPackage(payload);
          return NextResponse.json({ success: true, item: res });
        }
        if (action === "delete") {
          const res = await deletePackage(payload.id);
          return NextResponse.json({ success: res });
        }
        break;
      }
      case "trek": {
        if (action === "upsert") {
          const res = await upsertTrek(payload);
          return NextResponse.json({ success: true, item: res });
        }
        if (action === "delete") {
          const res = await deleteTrek(payload.id);
          return NextResponse.json({ success: res });
        }
        break;
      }
      case "experience": {
        if (action === "upsert") {
          const res = await upsertExperience(payload);
          return NextResponse.json({ success: true, item: res });
        }
        if (action === "delete") {
          const res = await deleteExperience(payload.id);
          return NextResponse.json({ success: res });
        }
        break;
      }
      case "testimonial": {
        if (action === "upsert") {
          const res = await upsertTestimonial(payload);
          return NextResponse.json({ success: true, item: res });
        }
        if (action === "delete") {
          const res = await deleteTestimonial(payload.id);
          return NextResponse.json({ success: res });
        }
        break;
      }
      case "faq": {
        if (action === "upsert") {
          const res = await upsertFAQ(payload);
          return NextResponse.json({ success: true, item: res });
        }
        if (action === "delete") {
          const res = await deleteFAQ(payload.id);
          return NextResponse.json({ success: res });
        }
        break;
      }
      case "enquiry": {
        if (action === "status") {
          const res = await updateEnquiryStatus(payload.id, payload.status);
          return NextResponse.json({ success: res });
        }
        if (action === "delete") {
          const res = await deleteEnquiry(payload.id);
          return NextResponse.json({ success: res });
        }
        break;
      }
      case "settings": {
        if (action === "update") {
          const res = await updateSiteSettings(payload);
          return NextResponse.json({ success: true, settings: res });
        }
        break;
      }
      default:
        return NextResponse.json({ error: `Unknown type: ${type}` }, { status: 400 });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (err) {
    console.error("CMS API error:", err);
    return NextResponse.json({ error: "Operation failed" }, { status: 500 });
  }
}
