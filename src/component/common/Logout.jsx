import jwtDecode from "jwt-decode";
import { errorToast } from "../../react-toastfiy/toast";
import auctionService from "../../services/auction/auction.service";

export const logout = async () => {
  try {
    const token = localStorage.getItem("refreshToken");
    if (token) {
      const user = jwtDecode(token);
      const user_designations_business = user?.assigned_states_designations
        ?.map(({ state, designations }) =>
          designations?.map(({ designation, business }) => business)
        )
        .flat();
      const is_auction_user =
        user_designations_business?.includes("Auction") ||
        user_designations_business?.includes("Tech") ||
        user_designations_business?.includes("Back Office");
      localStorage.clear();
      window.location.replace("/sign-in");
    }
  } catch (error) {
    console.error(error);
    errorToast(error?.message);
  }
};
