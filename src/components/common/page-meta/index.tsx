import { HelmetProvider, Helmet } from "react-helmet-async";

// import { useQuery } from "@tanstack/react-query";
// import { useDispatch } from "react-redux";
// import { setPermissions } from "../../../redux/slice";
// import { formatPermissionsForUI } from "../../../lib/helper/flate-permission";

// import { useAuth } from "../../../features/auth/hooks/useAuth";
// import { getrolebyidApi } from "../../../features/roles/service";
const PageMeta = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => (
  <Helmet>
    <title>{title}</title>
    <meta name="description" content={description} />
  </Helmet>
);

// export const AppWrapper = ({ children }: { children: React.ReactNode }) => (
//   <HelmetProvider>{children}</HelmetProvider>
// );
export const AppWrapper = ({ children }: { children: React.ReactNode }) => {
//   const dispatch = useDispatch();
//   const { token,user } = useAuth(); // assuming you have this
// const userRoleId = user?.roleId; // adjust based on your user object structure
//   const { isLoading } = useQuery({
//     queryKey: ["currentUser"],
//     queryFn: getrolebyidApi(userRoleId),
//     enabled: !!token,
//     onSuccess: (res) => { 
//       const formatted = formatPermissionsForUI(res.permissions);

//       dispatch(
//         setPermissions({
//           role: res.role,
//           access: formatted,
//         }),
//       );
//     },
//   });

//   // Optional: block UI until permissions load
//   if (isLoading && token) {
//     return (
//       <div className="w-full h-screen flex justify-center items-center">
//         Loading app...
//       </div>
//     );
//   }

  return <HelmetProvider>{children}</HelmetProvider>;
};

export default PageMeta;
