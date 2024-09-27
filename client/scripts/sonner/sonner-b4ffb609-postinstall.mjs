import { execSync } from "child_process";

try {
    console.log("Installing and building sonner-b4ffb609");
    execSync("cd node_modules/sonner-b4ffb609 && pnpm install && pnpm build", {
        stdio: "inherit",
    });

    console.log(
        "sonner-b4ffb609 dependencies installed and built successfully."
    );
} catch (error) {
    console.error("Error during postinstall script:", error);
    process.exit(1);
}
