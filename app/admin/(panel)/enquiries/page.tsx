import React from "react";
import { PageHeader } from "@/components/admin/ui";
import { EnquiriesAdmin } from "@/components/admin/EnquiriesAdmin";
import { getEnquiries } from "@/lib/cms/store";

export const dynamic = "force-dynamic";

export default async function AdminEnquiriesPage() {
  const enquiries = await getEnquiries();

  return (
    <div>
      <PageHeader
        title="Enquiries"
        subtitle={`${enquiries.length} lead${enquiries.length === 1 ? "" : "s"} from the website forms`}
      />
      <EnquiriesAdmin initial={enquiries} />
    </div>
  );
}
