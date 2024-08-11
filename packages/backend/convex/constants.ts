import { v4 as uuid } from "uuid";

import { Banner, Ent, Icon, Permissions } from "./types";
import { SystemFields } from "convex-ents/dist/schema";
import { SystemDataModel, WithoutSystemFields } from "convex/server";
import { Doc } from "./_generated/dataModel";

export const defaultContent: string =
  '[{"id":"26f187a2-6470-4899-b555-25e124b38888","type":"paragraph","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left"},"content":[],"children":[]},{"id":"80d1b3a2-44ef-451a-9a6d-8ece731364b8","type":"heading","props":{"textColor":"default","backgroundColor":"default","textAlignment":"center","level":2},"content":[{"type":"text","text":"Welcome to your new hub!","styles":{}}],"children":[]},{"id":"fb45c621-fd25-4557-a7db-1c5f5f7ecd94","type":"paragraph","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left"},"content":[],"children":[]},{"id":"51d7b532-9667-4e18-a42b-850cdf8ab136","type":"paragraph","props":{"textColor":"default","backgroundColor":"default","textAlignment":"center"},"content":[{"type":"text","text":"This content is fully customizable with a \\"notion\\" style editor ⭐️","styles":{}}],"children":[]},{"id":"d8492284-be69-49ee-a5c5-4dd6c93796b8","type":"paragraph","props":{"textColor":"default","backgroundColor":"default","textAlignment":"center"},"content":[{"type":"text","text":"You can re-arrange blocks by dragging the handles on the left\\n","styles":{}}],"children":[]},{"id":"a0339710-7fbc-40ac-893c-77d936e06a2f","type":"paragraph","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left"},"content":[],"children":[]},{"id":"1e568ef3-cb6c-4199-9ad7-68c5ac41bbae","type":"paragraph","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left"},"content":[{"type":"text","text":"By pressing \\"/\\" you can find the available blocks to use.","styles":{"bold":true,"italic":true}}],"children":[]},{"id":"f1e9a5eb-bd5d-4cbb-a813-714dc152c455","type":"paragraph","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left"},"content":[],"children":[]},{"id":"c15c8606-c765-4288-b510-7adb96f45614","type":"heading","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left","level":3},"content":[{"type":"text","text":"Few examples","styles":{"underline":true}}],"children":[]},{"id":"5ebceea2-ac7c-456c-a0b5-a321b2d7a3a8","type":"paragraph","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left"},"content":[],"children":[]},{"id":"2745b9db-fb37-497a-bcc5-311247e22382","type":"checkListItem","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left","checked":false},"content":[{"type":"text","text":"Numbered List","styles":{}}],"children":[]},{"id":"ad4043d7-3846-4b6d-bec4-f583a8fc2bf8","type":"numberedListItem","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left"},"content":[{"type":"text","text":"👨‍🔧","styles":{}}],"children":[]},{"id":"8334d2e5-7bf3-47b7-ad60-e92b319242e5","type":"numberedListItem","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left"},"content":[{"type":"text","text":"👩🏻‍🍳","styles":{}}],"children":[]},{"id":"919aec10-5781-4585-9344-cdb926a7d9a5","type":"paragraph","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left"},"content":[],"children":[]},{"id":"264e9a0c-8fdf-4450-9214-122e0ff48d07","type":"checkListItem","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left","checked":false},"content":[{"type":"text","text":"Button","styles":{}}],"children":[]},{"id":"55f76be8-e654-4fa3-886f-7cc666a398da","type":"button","props":{"textAlignment":"left","actionPath":""},"content":[{"type":"text","text":"👉 Apply now!","styles":{}}],"children":[]},{"id":"9472e548-8cda-4270-8dbb-5000b42c7970","type":"paragraph","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left"},"content":[{"type":"text","text":" ","styles":{}}],"children":[]},{"id":"0e7328d5-e635-4121-895f-a83d6391a038","type":"checkListItem","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left","checked":false},"content":[{"type":"text","text":"Image","styles":{}}],"children":[]},{"id":"81e72b3d-49e9-423b-8b0c-55dfb9d77e98","type":"image","props":{"backgroundColor":"default","textAlignment":"left","name":"logo-fullwhite.svg","url":"https://confident-terrier-401.convex.site/api/image/kg2e5tzzacv5q4w2srxqevb6sx6xhb3t","caption":"","showPreview":true,"previewWidth":512},"children":[]},{"id":"96175989-28a0-431b-ab3f-037c51bc1283","type":"paragraph","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left"},"content":[],"children":[]},{"id":"1f0de711-8d1e-4f29-84a5-cc7f08c81a0c","type":"paragraph","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left"},"content":[],"children":[]}]';
export const defaultBanner: Banner = { type: "URL", value: "/banner.png" };
export const defaultIcon: Icon = {
  type: "ICON",
  value: "logo",
};

export const defaultColor = "#5c93e6";

export const defaultEmailContent = (icon: Icon): string => {
  const logo = icon.type === "URL" ? icon.value : "/logo-small-black.svg";
  return `{"type":"doc","content":[{"type":"logo","attrs":{"src":"${logo}","alt":null,"title":null,"maily-component":"logo","size":"lg","alignment":"left"}},{"type":"spacer","attrs":{"height":"xl"}},{"type":"heading","attrs":{"textAlign":"left","level":2},"content":[{"type":"text","marks":[{"type":"bold"}],"text":"Discover Mailys"}]},{"type":"paragraph","attrs":{"textAlign":"left"},"content":[{"type":"text","text":"Are you ready to transform your email communication? Introducing Maily, the powerful email editor that enables you to craft captivating emails effortlessly."}]},{"type":"button","attrs":{"mailyComponent":"button","text":"Try Maily Now →","url":"","alignment":"left","variant":"filled","borderRadius":"round","buttonColor":"#141313","textColor":"#ffffff"}},{"type":"spacer","attrs":{"height":"xl"}}]}`;
};

export const defaultPageContent = (type: string): string => {
  switch (type) {
    case "PROFILE":
      return `[{"id":"61c039bf-b783-4951-8db8-c2756832a053","type":"heading","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left","level":3},"content":[{"type":"text","text":"Professional Experience","styles":{"bold":true}}],"children":[]},{"id":"e8fcb6c5-17a4-48df-9cd0-10e9e9853796","type":"paragraph","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left"},"content":[{"type":"text","text":"Community Manager","styles":{"bold":true}}],"children":[]},{"id":"081dbedd-1a7c-4caf-836a-2bb455477cb7","type":"paragraph","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left"},"content":[{"type":"text","text":"Girls In Tech, San Francisco","styles":{"italic":true}}],"children":[]},{"id":"9d65b466-a3fc-4ae0-9f8b-d3e84ccc9e8e","type":"paragraph","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left"},"content":[{"type":"text","text":"February 2019 – Present","styles":{"italic":true}}],"children":[]},{"id":"18f0b0ee-aef7-46e1-82be-91c63a241748","type":"bulletListItem","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left"},"content":[{"type":"text","text":"Organized over 50 workshops and events, fostering a supportive community for women in technology.","styles":{}}],"children":[]},{"id":"0d0b3c36-6fa8-47d0-8eb2-4d0570651c5a","type":"bulletListItem","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left"},"content":[{"type":"text","text":"Developed mentorship programs, connecting over 200 mentees with industry leaders.","styles":{}}],"children":[]},{"id":"7b21354c-1ce9-49f8-a21d-6cee9a8b2119","type":"bulletListItem","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left"},"content":[{"type":"text","text":"Managed social media channels, increasing engagement by 40%.","styles":{}}],"children":[]},{"id":"f272add7-5c2d-40b0-a159-4ec71b38cfd2","type":"paragraph","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left"},"content":[{"type":"text","text":"Event Coordinator","styles":{"bold":true}}],"children":[]},{"id":"f1890abf-2daa-4cde-aeb0-f7b1c84f1980","type":"paragraph","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left"},"content":[{"type":"text","text":"TechWomen, San Francisco","styles":{"italic":true}}],"children":[]},{"id":"ab20d17a-0ffc-481e-b272-1a970a455484","type":"paragraph","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left"},"content":[{"type":"text","text":"May 2016 – January 2019","styles":{"italic":true}}],"children":[]},{"id":"c44d175b-2ad4-4598-b6db-3c3645544df0","type":"bulletListItem","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left"},"content":[{"type":"text","text":"Planned and executed international conferences, attracting thousands of attendees.","styles":{}}],"children":[]},{"id":"d9c40929-17e1-4602-a02d-4ef0a2ecfa2c","type":"bulletListItem","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left"},"content":[{"type":"text","text":"Coordinated speaker engagements and panel discussions, featuring top tech executives.","styles":{}}],"children":[]},{"id":"8a857b0d-6b0e-4396-997a-853da89d3f95","type":"bulletListItem","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left"},"content":[{"type":"text","text":"Secured sponsorships and partnerships, generating significant funding for programs.","styles":{}}],"children":[]},{"id":"ae7de0a4-628e-40bc-847b-202f4111afc5","type":"paragraph","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left"},"content":[{"type":"text","text":"Program Assistant","styles":{"bold":true}}],"children":[]},{"id":"44618e07-ace6-4daa-b2cc-95d337fefe06","type":"paragraph","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left"},"content":[{"type":"text","text":"Women Who Code, San Francisco","styles":{"italic":true}}],"children":[]},{"id":"ac9d8242-1174-491c-a150-2774c0c7468c","type":"paragraph","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left"},"content":[{"type":"text","text":"June 2014 – April 2016","styles":{"italic":true}}],"children":[]},{"id":"1229de39-4017-46e6-bd7e-85dda2b1e100","type":"bulletListItem","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left"},"content":[{"type":"text","text":"Assisted in organizing coding bootcamps and hackathons, empowering women to enter the tech industry.","styles":{}}],"children":[]},{"id":"76583c36-7ea3-4b25-b961-45f600c561b3","type":"bulletListItem","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left"},"content":[{"type":"text","text":"Managed volunteer recruitment and training, ensuring smooth event operations.","styles":{}}],"children":[]},{"id":"71a238f1-8835-43d9-9961-0b0f818b9d9a","type":"bulletListItem","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left"},"content":[{"type":"text","text":"Collected and analyzed feedback to continuously improve program offerings.","styles":{}}],"children":[]},{"id":"8ad25495-0ce3-491d-b397-0b9be49bb230","type":"heading","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left","level":3},"content":[{"type":"text","text":"Education","styles":{"bold":true}}],"children":[]},{"id":"9bd48b79-bfc8-400d-bfc9-c65d25c02c56","type":"paragraph","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left"},"content":[{"type":"text","text":"Bachelor of Arts in Communication","styles":{"bold":true}}],"children":[]},{"id":"8401c8df-deb8-4d80-be75-6952baac3863","type":"paragraph","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left"},"content":[{"type":"text","text":"University of California, San Diego","styles":{"italic":true}}],"children":[]},{"id":"46a7d501-6503-4aa3-b1a5-22b83644c1a6","type":"paragraph","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left"},"content":[{"type":"text","text":"2010 – 2014","styles":{"italic":true}}],"children":[]},{"id":"3282fd02-8d3d-4677-9fa7-c0663982d5ac","type":"paragraph","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left"},"content":[{"type":"text","text":"Associate Degree in Event Management","styles":{"bold":true}}],"children":[]},{"id":"13189c74-3c57-4c69-bdf4-ba87a25d952b","type":"paragraph","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left"},"content":[{"type":"text","text":"City College of San Francisco, San Francisco","styles":{"italic":true}}],"children":[]},{"id":"165d4517-c687-44f9-a0c7-da82ab3d0268","type":"paragraph","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left"},"content":[{"type":"text","text":"2008 – 2010","styles":{"italic":true}}],"children":[]},{"id":"0b530512-9cf5-457e-80af-21554a0eaf9f","type":"paragraph","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left"},"content":[],"children":[]}]`;
    case "EVENT":
      return `[{"id":"26f187a2-6470-4899-b555-25e124b38888","type":"paragraph","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left"},"content":[{"type":"text","text":"Join us for an electrifying event that promises to ignite your curiosity and expand your understanding of cutting-edge technology! Whether you're a tech enthusiast, an industry professional, or just curious about the future, this event is perfect for you.","styles":{"bold":true}}],"children":[]},{"id":"11657a0f-1204-4a9e-a754-463672664565","type":"paragraph","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left"},"content":[],"children":[]},{"id":"c37157b5-4b1e-4a9a-ae00-022ac23a7920","type":"heading","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left","level":3},"content":[{"type":"text","text":"🔍 ","styles":{}},{"type":"text","text":"What to Expect:","styles":{"bold":true}}],"children":[]},{"id":"940867a6-14e5-4822-8c8f-28d3973f74c4","type":"bulletListItem","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left"},"content":[{"type":"text","text":"In-Depth Discussions:","styles":{"bold":true}},{"type":"text","text":" Explore how the latest advancements are reshaping industries and impacting our daily lives.","styles":{}}],"children":[]},{"id":"3264b8aa-a3b0-4e87-b167-f794993c2b08","type":"bulletListItem","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left"},"content":[{"type":"text","text":"Networking Opportunities:","styles":{"bold":true}},{"type":"text","text":" Connect with like-minded individuals and industry leaders from around the globe.","styles":{}}],"children":[]},{"id":"1b251b0d-e656-4786-b463-18f800b0a290","type":"bulletListItem","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left"},"content":[{"type":"text","text":"Interactive Q&A Sessions:","styles":{"bold":true}},{"type":"text","text":" Get your questions answered by leading experts in the field.","styles":{}}],"children":[]},{"id":"978ceaeb-99e3-4bc5-8f22-e0c66cf94026","type":"paragraph","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left"},"content":[],"children":[]},{"id":"b396b5b4-ced0-4192-ad9d-ef9231bb4c57","type":"heading","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left","level":3},"content":[{"type":"text","text":"🌟 ","styles":{}},{"type":"text","text":"Highlights:","styles":{"bold":true}}],"children":[]},{"id":"b02f5832-9ce7-471f-9985-f3ea83332d2f","type":"bulletListItem","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left"},"content":[{"type":"text","text":"Future of AI:","styles":{"bold":true}},{"type":"text","text":" Discover the trends and innovations set to revolutionize how we interact with technology.","styles":{}}],"children":[]},{"id":"56ac2d1c-8655-47e7-83c8-e9580fcc9b35","type":"bulletListItem","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left"},"content":[{"type":"text","text":"Expert Insights:","styles":{"bold":true}},{"type":"text","text":" Gain valuable perspectives from top minds in the industry.","styles":{}}],"children":[]},{"id":"d997304e-625a-4805-b0aa-f5cab2610c34","type":"paragraph","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left"},"content":[],"children":[]},{"id":"2d105c98-3932-4af4-ba22-ed5bd4292530","type":"heading","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left","level":3},"content":[{"type":"text","text":"📬 ","styles":{}},{"type":"text","text":"Stay Connected:","styles":{"bold":true}}],"children":[]},{"id":"d531dfe9-f51a-42ad-a353-17bc9d983116","type":"paragraph","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left"},"content":[{"type":"text","text":"Subscribe to our newsletter for updates, reminders, and exclusive content related to the event. Engage with us on social media using the hashtag ","styles":{}},{"type":"text","text":"#TechVision2024","styles":{"bold":true}},{"type":"text","text":" and be part of the conversation!","styles":{}}],"children":[]},{"id":"8cbe0e3e-b0ee-4fc6-8f39-bc14d01c6809","type":"paragraph","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left"},"content":[],"children":[]},{"id":"e2eb27ae-5459-4ffc-b110-e0b664fd54a4","type":"button","props":{"textAlignment":"center","actionPath":""},"content":[{"type":"text","text":"Subscribe ✨","styles":{}}],"children":[]},{"id":"dd1bff70-e45d-48f1-8f3e-8c8cbfda017a","type":"paragraph","props":{"textColor":"default","backgroundColor":"default","textAlignment":"center"},"content":[],"children":[]}]`;
    default:
      return defaultContent;
  }
};
export const defaultPageIcon = (type: string): Icon => {
  switch (type) {
    case "PROFILE":
      return {
        type: "EMOJI",
        value: "👤",
      };
    case "EVENT":
      return {
        type: "EMOJI",
        value: "🗓️",
      };
    default:
      return defaultIcon;
  }
};

export const defaultRoles: Record<string, Omit<WithoutSystemFields<Doc<"roles">>, "hubId">> = {
  owner: {
    name: "Owner",
    icon: { type: "ICON", value: "userStar" },
    isLocked: true,
    permissions: {
      canCreatePage: true,
      canEditPage: true,
      canDeletePage: true,
      canCreateField: true,
      canEditField: true,
      canDeleteField: true,
      canInviteMember: true,
      canRemoveMember: true,
      canEditRole: true,
      canSeeAdminPanel: true,
      canEditHub: true,
      canDeleteHub: true,
    },
  },
  admin: {
    name: "Admin",
    icon: { type: "ICON", value: "userShield" },
    isLocked: true,
    permissions: {
      canCreatePage: true,
      canEditPage: true,
      canDeletePage: true,
      canCreateField: true,
      canEditField: true,
      canDeleteField: true,
      canInviteMember: true,
      canRemoveMember: false,
      canEditRole: false,
      canSeeAdminPanel: true,
      canEditHub: true,
      canDeleteHub: false,
    },
  },
  creator: {
    name: "Creator",
    icon: { type: "ICON", value: "userPentagon" },
    isLocked: false,
    permissions: {
      canCreatePage: true,
      canEditPage: true,
      canDeletePage: false,
      canCreateField: true,
      canEditField: true,
      canDeleteField: true,
      canInviteMember: true,
      canRemoveMember: false,
      canEditRole: false,
      canSeeAdminPanel: false,
      canEditHub: false,
      canDeleteHub: false,
    },
  },
  viewer: {
    name: "Viewer",
    icon: { type: "ICON", value: "userCircle" },
    isLocked: false,
    permissions: {
      canCreatePage: false,
      canEditPage: false,
      canDeletePage: false,
      canCreateField: false,
      canEditField: false,
      canDeleteField: false,
      canInviteMember: false,
      canRemoveMember: false,
      canEditRole: false,
      canSeeAdminPanel: false,
      canEditHub: false,
      canDeleteHub: false,
    },
  },
};

export const defaultCollections : Record<string, Omit<WithoutSystemFields<Doc<"collections">>, "hubId">> = {
  gallery: {
    name: "",
    banner: defaultBanner,
    icon: defaultIcon,
  }
};


export const unAvailableSubdomains = [
  "admin",
  "api",
  "app",
  "knowingly",
  "accounts"
];