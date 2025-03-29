import { apiBook } from "@/lib/urls";
import { authApiCall } from "@/services/auth";
import { useNavigate } from "@remix-run/react";
import { toast } from "sonner";

function GmailLogin() {
  const handleClick = async () => {
    try {
      const res = await authApiCall({
        url: apiBook["LOGIN_wITH_GOOGLE"],
        method: "GET",
        data: {},
      });
      window.location.href = res?.data?.data?.responseData;
    } catch (error) {
      console.log("error", error);
      toast.error("Error while fetching the URL");
    }
  };
  return (
    <button
      className="p-3 border flex gap-x-3 items-center bg-white shadow-md rounded-md"
      onClick={handleClick}
    >
      <div>
        <img src="/google-logo.png" className="h-10 w-10" alt="gmail" />
      </div>
      <p className="font-semibold font-mono">
        <span className="ml-2">Login with Gmail</span>
      </p>
    </button>
  );
}

export default GmailLogin;
