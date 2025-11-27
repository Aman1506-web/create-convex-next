// Convex schema: defines tables used by the app. Users table indexed by clerkId from Clerk webhook.
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    name: v.string(),
    email: v.string(),
    image: v.optional(v.string()),
    clerkId: v.string(),
    dodoCustomerid: v.optional(v.string()),
  }).index("by_clerk_id", ["clerkId"]),
});
