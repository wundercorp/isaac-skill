#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const currentFilePath = fileURLToPath(import.meta.url);
const currentDirectoryPath = path.dirname(currentFilePath);
const defaultRootDirectoryPath = process.cwd();
const commandLineArguments = parseCommandLineArguments(process.argv.slice(2));
const requestedRootDirectoryPath = path.resolve(getArgumentValue(commandLineArguments, "root", defaultRootDirectoryPath));
const shouldWriteFiles = hasFlag(commandLineArguments, "write");
const shouldForceOverwrite = hasFlag(commandLineArguments, "force");
const reviewDirectoryPath = path.join(requestedRootDirectoryPath, ".app-store-review");
const sourceReferencesDirectoryPath = path.resolve(currentDirectoryPath, "..", "references");

const appStoreReviewFiles = [
  {
    fileName: "APP_STORE_REVIEW_CHECKLIST.md",
    sourceFileName: "app-store-review-checklist.md",
  },
  {
    fileName: "REVIEW_NOTES.md",
    sourceFileName: "review-notes-template.md",
  },
  {
    fileName: "PRIVACY_AND_PERMISSIONS_INVENTORY.md",
    sourceFileName: "privacy-and-permissions-inventory.md",
  },
  {
    fileName: "REJECTION_RISK_REGISTER.md",
    sourceFileName: "rejection-risk-register.md",
  },
  {
    fileName: "DEFAULT_COMPATIBLE_APP_PATTERNS.md",
    sourceFileName: "default-compatible-app-patterns.md",
  },
];

const generatedFiles = buildGeneratedFiles(requestedRootDirectoryPath);
const detectedSignals = collectDetectedSignals(requestedRootDirectoryPath);

if (shouldWriteFiles === true) {
  fs.mkdirSync(reviewDirectoryPath, { recursive: true });
  writeReferenceFiles(reviewDirectoryPath, appStoreReviewFiles);
  writeGeneratedFiles(reviewDirectoryPath, generatedFiles);
  console.log(`Isaac review packet written to ${reviewDirectoryPath}`);
} else {
  console.log("Isaac audit preview. Run with --write to create the review packet.");
}

printDetectedSignals(detectedSignals);

function buildGeneratedFiles(rootDirectoryPath) {
  return [
    {
      fileName: "APP_STORE_CONNECT_METADATA.md",
      content: buildAppStoreConnectMetadataTemplate(rootDirectoryPath),
    },
    {
      fileName: "THIRD_PARTY_SDK_INVENTORY.md",
      content: buildThirdPartySdkInventoryTemplate(rootDirectoryPath),
    },
    {
      fileName: "IAP_AND_SUBSCRIPTIONS.md",
      content: buildInAppPurchaseTemplate(rootDirectoryPath),
    },
    {
      fileName: "UGC_MODERATION_PLAN.md",
      content: buildUserGeneratedContentTemplate(rootDirectoryPath),
    },
    {
      fileName: "REGULATED_FEATURES.md",
      content: buildRegulatedFeaturesTemplate(rootDirectoryPath),
    },
    {
      fileName: "ISAAC_AUDIT_SUMMARY.md",
      content: buildAuditSummaryTemplate(rootDirectoryPath),
    },
  ];
}

function buildAppStoreConnectMetadataTemplate(rootDirectoryPath) {
  return [
    "# App Store Connect Metadata",
    "",
    `Repository: ${path.basename(rootDirectoryPath)}`,
    "",
    "## App identity",
    "",
    "- App name:",
    "- Subtitle:",
    "- Bundle identifier:",
    "- SKU:",
    "- Primary category:",
    "- Secondary category:",
    "- Content rights:",
    "",
    "## Description",
    "",
    "Draft the public description here and verify that every claim is visible in the app.",
    "",
    "## Keywords",
    "",
    "List only accurate keywords. Do not stuff competitor names, trademarked terms, prices, or irrelevant phrases.",
    "",
    "## Screenshots",
    "",
    "| Screenshot | Real app screen? | Feature shown | Any paid content? | Notes |",
    "| --- | --- | --- | --- | --- |",
    "| | | | | |",
    "",
    "## App preview videos",
    "",
    "| Preview | Captured from app? | Feature shown | Narration or overlays | Notes |",
    "| --- | --- | --- | --- | --- |",
    "| | | | | |",
    "",
    "## Age rating",
    "",
    "- Violence:",
    "- Sexual content:",
    "- Mature themes:",
    "- Medical or treatment information:",
    "- Gambling or contests:",
    "- User-generated content:",
    "- Web access:",
    "",
    "## Support and legal URLs",
    "",
    "- Support URL:",
    "- Privacy policy URL:",
    "- Marketing URL:",
    "- Terms URL:",
    "",
  ].join("\n");
}

function buildThirdPartySdkInventoryTemplate(rootDirectoryPath) {
  return [
    "# Third-Party SDK Inventory",
    "",
    `Repository: ${path.basename(rootDirectoryPath)}`,
    "",
    "| SDK | Version | Purpose | Data collected | Data shared | Tracking? | Used by kids? | Privacy label impact | Removal owner |",
    "| --- | --- | --- | --- | --- | --- | --- | --- | --- |",
    "| | | | | | | | | |",
    "",
    "## SDK approval checklist",
    "",
    "- Every SDK has a business purpose.",
    "- Every SDK is represented in privacy labels when required.",
    "- Every SDK privacy policy was reviewed.",
    "- Tracking SDKs use the correct consent flow.",
    "- Sensitive data is not sent to ads, analytics, or AI services without consent and legal clearance.",
    "- Kids or classroom data is not sent to third parties unless clearly permitted and documented.",
    "",
  ].join("\n");
}

function buildInAppPurchaseTemplate(rootDirectoryPath) {
  return [
    "# In-App Purchases and Subscriptions",
    "",
    `Repository: ${path.basename(rootDirectoryPath)}`,
    "",
    "## Business model",
    "",
    "- Free:",
    "- Paid app:",
    "- Consumables:",
    "- Non-consumables:",
    "- Auto-renewable subscriptions:",
    "- Non-renewing subscriptions:",
    "- Digital tips:",
    "- Credits or virtual currency:",
    "- External purchase links:",
    "- Physical goods or real-world services:",
    "",
    "## Product table",
    "",
    "| Product ID | Type | Unlocks | Price | Visible in app? | Review path | Restore? | Notes |",
    "| --- | --- | --- | --- | --- | --- | --- | --- |",
    "| | | | | | | | |",
    "",
    "## Subscription disclosure",
    "",
    "- Duration:",
    "- Price:",
    "- Trial:",
    "- Renewal:",
    "- Cancellation instructions:",
    "- Features lost after expiration:",
    "",
  ].join("\n");
}

function buildUserGeneratedContentTemplate(rootDirectoryPath) {
  return [
    "# User-Generated Content Moderation Plan",
    "",
    `Repository: ${path.basename(rootDirectoryPath)}`,
    "",
    "## UGC surfaces",
    "",
    "| Surface | Content type | Public? | Mature risk | Moderation before publish? | Notes |",
    "| --- | --- | --- | --- | --- | --- |",
    "| | | | | | |",
    "",
    "## Required controls",
    "",
    "- Report content path:",
    "- Report user path:",
    "- Block user path:",
    "- Content filtering path:",
    "- Moderator queue:",
    "- Response process:",
    "- Developer contact:",
    "- Age handling:",
    "- Creator content purchase disclosure:",
    "",
  ].join("\n");
}

function buildRegulatedFeaturesTemplate(rootDirectoryPath) {
  return [
    "# Regulated Features",
    "",
    `Repository: ${path.basename(rootDirectoryPath)}`,
    "",
    "Treat this file as required when the app touches health, finance, crypto, insurance, lending, gambling, lotteries, VPN, MDM, cannabis, law enforcement reporting, air travel, vehicle control, emergency services, children, or sensitive personal data.",
    "",
    "| Feature | Territory | Legal entity | License or clearance | Geo-restriction | Reviewer evidence | Status |",
    "| --- | --- | --- | --- | --- | --- | --- |",
    "| | | | | | | |",
    "",
    "## Legal review",
    "",
    "- Legal reviewer:",
    "- Review date:",
    "- Distribution territories approved:",
    "- Territories excluded:",
    "- Evidence location:",
    "",
  ].join("\n");
}

function buildAuditSummaryTemplate(rootDirectoryPath) {
  const detectedSignals = collectDetectedSignals(rootDirectoryPath);
  const signalLines = detectedSignals.length === 0 ? ["- No obvious repository signals were detected. Complete the packet manually."] : detectedSignals.map((detectedSignal) => `- ${detectedSignal}`);
  return [
    "# Isaac Audit Summary",
    "",
    `Repository: ${path.basename(rootDirectoryPath)}`,
    `Generated at: ${new Date().toISOString()}`,
    "",
    "## Detected signals",
    "",
    ...signalLines,
    "",
    "## Next actions",
    "",
    "1. Complete every blank table in this review packet.",
    "2. Fix all blocker and high risks before App Store submission.",
    "3. Confirm the current Apple App Store Review Guidelines before submission.",
    "4. Copy the final REVIEW_NOTES.md content into App Store Connect review notes.",
    "",
  ].join("\n");
}

function collectDetectedSignals(rootDirectoryPath) {
  const textFiles = collectTextFiles(rootDirectoryPath, 350);
  const combinedLowercaseText = textFiles.map((textFile) => textFile.content.toLowerCase()).join("\n");
  const detectedSignals = [];

  if (combinedLowercaseText.includes("storekit") || combinedLowercaseText.includes("subscription") || combinedLowercaseText.includes("in-app purchase") || combinedLowercaseText.includes("purchase")) {
    detectedSignals.push("Potential purchase or subscription behavior detected. Complete IAP_AND_SUBSCRIPTIONS.md.");
  }

  if (combinedLowercaseText.includes("comment") || combinedLowercaseText.includes("chat") || combinedLowercaseText.includes("post") || combinedLowercaseText.includes("profile") || combinedLowercaseText.includes("message")) {
    detectedSignals.push("Potential user-generated content or social behavior detected. Complete UGC_MODERATION_PLAN.md.");
  }

  if (combinedLowercaseText.includes("health") || combinedLowercaseText.includes("medical") || combinedLowercaseText.includes("dosage") || combinedLowercaseText.includes("diagnosis") || combinedLowercaseText.includes("fitness")) {
    detectedSignals.push("Potential health, medical, or fitness behavior detected. Complete REGULATED_FEATURES.md and privacy inventory.");
  }

  if (combinedLowercaseText.includes("crypto") || combinedLowercaseText.includes("wallet") || combinedLowercaseText.includes("loan") || combinedLowercaseText.includes("bank") || combinedLowercaseText.includes("invest")) {
    detectedSignals.push("Potential financial or crypto behavior detected. Verify legal entity, licensing, payments, and territory restrictions.");
  }

  if (combinedLowercaseText.includes("location") || combinedLowercaseText.includes("cllocation") || combinedLowercaseText.includes("mapkit")) {
    detectedSignals.push("Potential location behavior detected. Verify purpose strings, consent, fallback behavior, and privacy disclosure.");
  }

  if (combinedLowercaseText.includes("camera") || combinedLowercaseText.includes("microphone") || combinedLowercaseText.includes("photos") || combinedLowercaseText.includes("contacts")) {
    detectedSignals.push("Potential protected resource access detected. Complete permission inventory and denied-state behavior.");
  }

  if (combinedLowercaseText.includes("firebase") || combinedLowercaseText.includes("amplitude") || combinedLowercaseText.includes("segment") || combinedLowercaseText.includes("mixpanel") || combinedLowercaseText.includes("appsflyer") || combinedLowercaseText.includes("adjust")) {
    detectedSignals.push("Potential analytics or attribution SDK detected. Complete THIRD_PARTY_SDK_INVENTORY.md and privacy labels.");
  }

  if (combinedLowercaseText.includes("openai") || combinedLowercaseText.includes("anthropic") || combinedLowercaseText.includes("gemini") || combinedLowercaseText.includes("llm") || /\bai\b/.test(combinedLowercaseText)) {
    detectedSignals.push("Potential AI behavior detected. Document personal data sharing, consent, retention, and content safety.");
  }

  if (combinedLowercaseText.includes("todo") || combinedLowercaseText.includes("placeholder") || combinedLowercaseText.includes("lorem ipsum") || combinedLowercaseText.includes("coming soon")) {
    detectedSignals.push("Potential placeholder or incomplete content detected. Remove release blockers before submission.");
  }

  return [...new Set(detectedSignals)];
}

function collectTextFiles(rootDirectoryPath, maximumFiles) {
  const collectedTextFiles = [];
  const ignoredDirectoryNames = new Set([".git", "node_modules", "dist", "build", ".next", ".expo", "DerivedData", ".app-store-review", "skills", "references"]);
  const allowedExtensions = new Set([".swift", ".m", ".mm", ".h", ".plist", ".json", ".md", ".txt", ".tsx", ".ts", ".jsx", ".js", ".yml", ".yaml", ".xml"]);
  const ignoredFileNames = new Set(["isaac-audit.mjs", "check-isaac.mjs", "isaac-audit.ps1"]);

  walkDirectory(rootDirectoryPath);
  return collectedTextFiles;

  function walkDirectory(directoryPath) {
    if (collectedTextFiles.length >= maximumFiles) {
      return;
    }

    let directoryEntries = [];
    try {
      directoryEntries = fs.readdirSync(directoryPath, { withFileTypes: true });
    } catch {
      return;
    }

    for (const directoryEntry of directoryEntries) {
      if (collectedTextFiles.length >= maximumFiles) {
        return;
      }

      const entryPath = path.join(directoryPath, directoryEntry.name);
      if (directoryEntry.isDirectory()) {
        if (ignoredDirectoryNames.has(directoryEntry.name) === false) {
          walkDirectory(entryPath);
        }
        continue;
      }

      if (directoryEntry.isFile() === false) {
        continue;
      }

      if (ignoredFileNames.has(directoryEntry.name) === true) {
        continue;
      }

      const extensionName = path.extname(directoryEntry.name).toLowerCase();
      if (allowedExtensions.has(extensionName) === false) {
        continue;
      }

      let fileStatistics;
      try {
        fileStatistics = fs.statSync(entryPath);
      } catch {
        continue;
      }

      if (fileStatistics.size > 250000) {
        continue;
      }

      try {
        collectedTextFiles.push({ filePath: entryPath, content: fs.readFileSync(entryPath, "utf8") });
      } catch {
      }
    }
  }
}

function writeReferenceFiles(destinationDirectoryPath, referenceFiles) {
  for (const referenceFile of referenceFiles) {
    const sourceFilePath = path.join(sourceReferencesDirectoryPath, referenceFile.sourceFileName);
    const destinationFilePath = path.join(destinationDirectoryPath, referenceFile.fileName);
    const content = fs.readFileSync(sourceFilePath, "utf8");
    writeFileUnlessExists(destinationFilePath, content);
  }
}

function writeGeneratedFiles(destinationDirectoryPath, files) {
  for (const file of files) {
    const destinationFilePath = path.join(destinationDirectoryPath, file.fileName);
    writeFileUnlessExists(destinationFilePath, file.content);
  }
}

function writeFileUnlessExists(filePath, content) {
  if (fs.existsSync(filePath) === true && shouldForceOverwrite === false) {
    console.log(`Kept existing file: ${filePath}`);
    return;
  }

  fs.writeFileSync(filePath, content.endsWith("\n") ? content : `${content}\n`);
  console.log(`Wrote ${filePath}`);
}

function printDetectedSignals(detectedSignals) {
  if (detectedSignals.length === 0) {
    console.log("No obvious review-sensitive signals were detected from quick repository scanning.");
    return;
  }

  console.log("Detected review-sensitive signals:");
  for (const detectedSignal of detectedSignals) {
    console.log(`- ${detectedSignal}`);
  }
}

function parseCommandLineArguments(argumentValues) {
  const parsedArguments = new Map();
  for (let argumentIndex = 0; argumentIndex < argumentValues.length; argumentIndex += 1) {
    const argumentValue = argumentValues[argumentIndex];
    if (argumentValue.startsWith("--") === false) {
      continue;
    }

    const argumentName = argumentValue.slice(2);
    const nextArgumentValue = argumentValues[argumentIndex + 1];
    if (nextArgumentValue && nextArgumentValue.startsWith("--") === false) {
      parsedArguments.set(argumentName, nextArgumentValue);
      argumentIndex += 1;
    } else {
      parsedArguments.set(argumentName, true);
    }
  }
  return parsedArguments;
}

function hasFlag(parsedArguments, flagName) {
  return parsedArguments.get(flagName) === true;
}

function getArgumentValue(parsedArguments, argumentName, defaultValue) {
  const argumentValue = parsedArguments.get(argumentName);
  if (typeof argumentValue === "string" && argumentValue.trim().length > 0) {
    return argumentValue;
  }
  return defaultValue;
}
