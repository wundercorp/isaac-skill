#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const commandLineArguments = parseCommandLineArguments(process.argv.slice(2));
const rootDirectoryPath = path.resolve(getArgumentValue(commandLineArguments, "root", process.cwd()));
const shouldWarnOnly = hasFlag(commandLineArguments, "warn-only");
const reviewDirectoryPath = path.join(rootDirectoryPath, ".app-store-review");
const textFiles = collectTextFiles(rootDirectoryPath, 600);
const combinedLowercaseText = textFiles.map((textFile) => textFile.content.toLowerCase()).join("\n");
const findings = [];

addDocumentationFindings();
addCodeSignalFindings();
addIosConfigurationFindings();
printFindingsAndExit();

function addDocumentationFindings() {
  requireFile("APP_STORE_REVIEW_CHECKLIST.md", "Blocker", "Create the App Store review checklist with `node scripts/isaac-audit.mjs --write`.");
  requireFile("REVIEW_NOTES.md", "Blocker", "Create and complete review notes before submission.");
  requireFile("PRIVACY_AND_PERMISSIONS_INVENTORY.md", "Blocker", "Create and complete the privacy and permissions inventory.");
  requireFile("THIRD_PARTY_SDK_INVENTORY.md", "High", "Create and complete the third-party SDK inventory.");
  requireFile("REJECTION_RISK_REGISTER.md", "High", "Create and complete the rejection risk register.");

  if (containsAny(combinedLowercaseText, ["subscription", "storekit", "in-app purchase", "iap", "premium", "unlock", "credits"]) === true) {
    requireFile("IAP_AND_SUBSCRIPTIONS.md", "Blocker", "Purchase or subscription language detected. Document StoreKit products, restore behavior, and review paths.");
  }

  if (containsAny(combinedLowercaseText, ["comment", "chat", "message", "post", "profile", "follow", "feed", "creator"]) === true) {
    requireFile("UGC_MODERATION_PLAN.md", "Blocker", "UGC or social language detected. Document report, block, filtering, moderation, and contact workflows.");
  }

  if (containsAny(combinedLowercaseText, ["health", "medical", "diagnosis", "dosage", "crypto", "wallet", "loan", "gambling", "bet", "vpn", "mdm", "cannabis", "emergency"]) === true) {
    requireFile("REGULATED_FEATURES.md", "Blocker", "Regulated or sensitive language detected. Document legal entity, licenses, clearances, and territory restrictions.");
  }
}

function addCodeSignalFindings() {
  if (containsAny(combinedLowercaseText, ["lorem ipsum", "placeholder", "todo", "fixme", "coming soon", "dummy text"]) === true) {
    findings.push({ severity: "High", message: "Potential placeholder, TODO, or incomplete production content detected." });
  }

  if (containsAny(combinedLowercaseText, ["sign in with google", "login with google", "sign in with facebook", "login with facebook", "sign in with x", "login with x"]) === true && containsAny(combinedLowercaseText, ["sign in with apple", "signinwithapple", "asauthorizationappleidprovider"]) === false) {
    findings.push({ severity: "High", message: "Third-party or social sign-in language detected without obvious Sign in with Apple support. Verify Apple sign-in requirements." });
  }

  if (containsAny(combinedLowercaseText, ["create account", "sign up", "signup", "register"]) === true && containsAny(combinedLowercaseText, ["delete account", "account deletion", "remove account", "close account"]) === false) {
    findings.push({ severity: "Blocker", message: "Account creation language detected without obvious in-app account deletion language." });
  }

  if (containsAny(combinedLowercaseText, ["camera", "microphone", "location", "contacts", "photos", "tracking"]) === true && (fileExistsSomewhere(reviewDirectoryPath, "PRIVACY_AND_PERMISSIONS_INVENTORY.md") === false && fileExistsSomewhere(rootDirectoryPath, "PRIVACY_AND_PERMISSIONS_INVENTORY.md") === false)) {
    findings.push({ severity: "Blocker", message: "Protected permission language detected without a privacy and permissions inventory." });
  }

  if (containsAny(combinedLowercaseText, ["external payment", "stripe", "paypal", "checkout", "buy now", "purchase on web"]) === true && containsAny(combinedLowercaseText, ["physical goods", "real-world service", "external purchase entitlement", "storekit"]) === false) {
    findings.push({ severity: "High", message: "External payment language detected. Verify it is not bypassing StoreKit for digital goods or features." });
  }

  if (containsAny(combinedLowercaseText, ["firebase", "amplitude", "segment", "mixpanel", "adjust", "appsflyer", "facebook sdk", "google analytics"]) === true && (fileExistsSomewhere(reviewDirectoryPath, "THIRD_PARTY_SDK_INVENTORY.md") === false && fileExistsSomewhere(rootDirectoryPath, "THIRD_PARTY_SDK_INVENTORY.md") === false)) {
    findings.push({ severity: "High", message: "Analytics, attribution, or SDK language detected without a third-party SDK inventory." });
  }
}

function addIosConfigurationFindings() {
  const plistFiles = textFiles.filter((textFile) => textFile.filePath.toLowerCase().endsWith(".plist"));
  const combinedPlistText = plistFiles.map((plistFile) => plistFile.content).join("\n");
  if (combinedPlistText.length === 0) {
    return;
  }

  const permissionPurposeKeys = [
    "NSCameraUsageDescription",
    "NSMicrophoneUsageDescription",
    "NSPhotoLibraryUsageDescription",
    "NSPhotoLibraryAddUsageDescription",
    "NSContactsUsageDescription",
    "NSLocationWhenInUseUsageDescription",
    "NSLocationAlwaysAndWhenInUseUsageDescription",
    "NSBluetoothAlwaysUsageDescription",
    "NSUserTrackingUsageDescription",
    "NSSpeechRecognitionUsageDescription",
    "NSCalendarsUsageDescription",
    "NSRemindersUsageDescription",
    "NSMotionUsageDescription",
    "NSHealthShareUsageDescription",
    "NSHealthUpdateUsageDescription",
    "NSLocalNetworkUsageDescription",
  ];

  for (const permissionPurposeKey of permissionPurposeKeys) {
    if (combinedPlistText.includes(permissionPurposeKey) === true) {
      const purposeStringPattern = new RegExp(`${permissionPurposeKey}[\\s\\S]{0,240}<string>(.*?)<\\/string>`, "i");
      const purposeStringMatch = combinedPlistText.match(purposeStringPattern);
      const purposeStringValue = purposeStringMatch ? purposeStringMatch[1].trim() : "";
      if (purposeStringValue.length < 18 || containsAny(purposeStringValue.toLowerCase(), ["need access", "required", "app needs", "use this permission"]) === true) {
        findings.push({ severity: "High", message: `${permissionPurposeKey} appears generic or too short. Use feature-specific permission copy.` });
      }
    }
  }
}

function requireFile(fileName, severity, message) {
  if (fileExistsSomewhere(reviewDirectoryPath, fileName) === false && fileExistsSomewhere(rootDirectoryPath, fileName) === false) {
    findings.push({ severity, message });
  }
}

function printFindingsAndExit() {
  if (findings.length === 0) {
    console.log("Isaac check passed. No obvious App Store review readiness blockers were detected by static checks.");
    process.exit(0);
  }

  const severityOrder = new Map([["Blocker", 0], ["High", 1], ["Medium", 2], ["Low", 3]]);
  findings.sort((leftFinding, rightFinding) => severityOrder.get(leftFinding.severity) - severityOrder.get(rightFinding.severity));
  console.log("Isaac check found App Store review readiness issues:");
  for (const finding of findings) {
    console.log(`- ${finding.severity}: ${finding.message}`);
  }

  const hasBlocker = findings.some((finding) => finding.severity === "Blocker");
  if (hasBlocker === true && shouldWarnOnly === false) {
    process.exit(1);
  }

  process.exit(0);
}

function collectTextFiles(startDirectoryPath, maximumFiles) {
  const collectedTextFiles = [];
  const ignoredDirectoryNames = new Set([".git", "node_modules", "dist", "build", ".next", ".expo", "DerivedData", "coverage", ".app-store-review", "skills", "references"]);
  const allowedExtensions = new Set([".swift", ".m", ".mm", ".h", ".plist", ".json", ".md", ".txt", ".tsx", ".ts", ".jsx", ".js", ".yml", ".yaml", ".xml", ".entitlements"]);
  const ignoredFileNames = new Set(["isaac-audit.mjs", "check-isaac.mjs", "isaac-audit.ps1"]);

  walkDirectory(startDirectoryPath);
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
      if (directoryEntry.isDirectory() === true) {
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

      if (fileStatistics.size > 300000) {
        continue;
      }

      try {
        collectedTextFiles.push({ filePath: entryPath, content: fs.readFileSync(entryPath, "utf8") });
      } catch {
      }
    }
  }
}

function fileExistsSomewhere(startDirectoryPath, fileName) {
  if (fs.existsSync(startDirectoryPath) === false) {
    return false;
  }

  let foundFile = false;
  const ignoredDirectoryNames = new Set([".git", "node_modules", "dist", "build", ".next", ".expo", "DerivedData", "coverage", ".app-store-review", "skills", "references"]);
  walkDirectory(startDirectoryPath);
  return foundFile;

  function walkDirectory(directoryPath) {
    if (foundFile === true) {
      return;
    }

    let directoryEntries = [];
    try {
      directoryEntries = fs.readdirSync(directoryPath, { withFileTypes: true });
    } catch {
      return;
    }

    for (const directoryEntry of directoryEntries) {
      const entryPath = path.join(directoryPath, directoryEntry.name);
      if (directoryEntry.isFile() === true && directoryEntry.name === fileName) {
        foundFile = true;
        return;
      }
      if (directoryEntry.isDirectory() === true && ignoredDirectoryNames.has(directoryEntry.name) === false) {
        walkDirectory(entryPath);
      }
    }
  }
}

function containsAny(textValue, searchValues) {
  for (const searchValue of searchValues) {
    if (textValue.includes(searchValue) === true) {
      return true;
    }
  }
  return false;
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
