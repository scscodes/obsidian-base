module.exports = async (tp) => {
  const now = tp.date.now("YYYY-MM-DD");
  const updated = tp.date.now("YYYY-MM-DDTHH:mm:ss");
  const fileName = tp.file.title;
  const filePath = tp.file.path(true).toLowerCase();
  const uuid = crypto.randomUUID
    ? crypto.randomUUID()
    : Math.random().toString(36).substring(2, 10) + "-" + Date.now();

  const pathSegments = filePath.split("/");

  let classValue = "misc";
  let typeValue = "unspecified";

  const rules = [
    { class: "journal", test: (p) => p.includes("journals") },
    { class: "asset", test: (p) => p.includes("assets") },
    { class: "finance", test: (p) => p.includes("finance") },
    { class: "hobby", test: (p) => p.includes("hobbies") },
    { class: "medical", test: (p) => p.includes("medical") },
    { class: "professional", test: (p) => p.includes("professional") },
    { class: "profile", test: (p) => p.includes("profiles") },
    { class: "reference", test: (p) => p.includes("references") },
    { class: "misc", test: (p) => p.includes("misc") }
  ];

  for (let rule of rules) {
    if (rule.test(filePath)) {
      classValue = rule.class;
      break;
    }
  }

  // Journal-specific detection based on filename pattern
  if (classValue === "journal") {
    const name = fileName.toLowerCase();
    if (name.match(/^20\d{2}-w\d{1,2}$/)) {
      typeValue = "weekly";
    } else if (name.match(/^20\d{2}-\d{2}$/)) {
      typeValue = "monthly";
    } else {
      typeValue = "daily";
    }
  }

  // Extract type from subfolder for categorized classes
  if (["assets", "profiles", "medical"].includes(classValue)) {
    const idx = pathSegments.findIndex((seg) => seg === classValue);
    if (idx !== -1 && pathSegments.length > idx + 1) {
      typeValue = pathSegments[idx + 1];
    } else {
      typeValue = "general";
    }
  }

  let tags = [classValue, typeValue];
  if (classValue === "misc" || typeValue === "unspecified") {
    tags.push("needs-classification");
  }

  return `---
title: ${fileName}
aliases: []
created: ${now}
updated: ${updated}
class: ${classValue}
type: ${typeValue}
tags: [${tags.join(", ")}]
id: ${uuid}
---`;
};
