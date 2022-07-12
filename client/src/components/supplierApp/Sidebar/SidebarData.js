import { RiHomeSmileLine } from 'react-icons/ri';
import { TbClipboardText, TbDeviceAnalytics } from 'react-icons/tb';
import { FiPackage } from 'react-icons/fi';
import { CgProfile } from 'react-icons/cg';

export const SidebarData = [
    // {
    //     icon: RiHomeSmileLine,
    //     heading: "Dashboard",
    //     path: "/"
    // },
    {
        icon: TbClipboardText,
        heading: "Orders",
        path: "/orders"
    },
    {
        icon: FiPackage,
        heading: "Products",
        path: "/products"
    },
    // {
    //     icon: TbDeviceAnalytics,
    //     heading: "Analytics",
    //     path: "/analytics"
    // },
    {
        icon: CgProfile,
        heading: "Profile",
        path: "/profile"
    }
]