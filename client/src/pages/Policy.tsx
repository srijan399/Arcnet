import { AppSidebar } from "@/components/functions/AppSidebar";
import Navbar from "../components/functions/Navbar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { useAccount } from "wagmi";
// import contractAbi, { contractAddress } from "@/abi";

function Landing() {
  const { address } = useAccount();
  // const contAddress: String = contractAddress;
  // const contAbi: any = contractAbi;

  return (
    <div className="text-text bg-background min-h-screen">
      <Navbar />
      <SidebarProvider className="h-[20%]">
        <AppSidebar head={address ? address : ""} />
        <SidebarTrigger className="mt-2" />
      </SidebarProvider>
    </div>
  );
}

export default Landing;
