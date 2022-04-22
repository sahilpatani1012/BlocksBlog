import res from "express/lib/response";
import { getAuth, signOut } from "firebase/auth";
const logout = document.getElementById("logout");
logout.addEventListener("click", function () {
  const auth = getAuth();
  signOut(auth)
    .then((res) => {
      res.redirect("/");
    })
    .catch((error) => {
      console.log(error);
    });
});
