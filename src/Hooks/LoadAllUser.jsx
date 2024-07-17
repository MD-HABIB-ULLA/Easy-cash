// import { useQuery } from "@tanstack/react-query";
// import useAuth from "./useAuth";
// import useAxiosPablic from "./useAxiosPpablic";

import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

// const UseAplicationFiner = () => {
//   const { user, loading } = useAuth();

//   const axiosPublic = useAxiosPablic();
//   const { data: applictionBecameTrainer = [], refetch } = useQuery({
//     queryKey: ["applictionBecame", user?.email],
//     enabled: !loading && !!user?.email && !!localStorage.getItem("access-token"),

//     queryFn: async () => {
//       if (user.email) {
//         const res = await axiosPublic.get(
//           `/applictionBecameTrainer/${user?.email}`
//         );
//         return res.data;
//       }
//     },
//   });
//   return [applictionBecameTrainer, refetch];
// };

// export default UseAplicationFiner;

const useLoadAllUser = () => {
  const axiosSecure = useAxiosSecure();

  const { data: userData = [], refetch , isPending} = useQuery({
    queryKey: ["userData"],

    queryFn: async () => {
      const res = await axiosSecure.get("/alluser");
      return res.data;
    },
  });
  return [userData, refetch,isPending];
};

export default useLoadAllUser;
