import LogoutIcon from "../components/svg/logout.tsx";

interface LogoutBtnProps {
  route: string;
}

export default function LogoutBtn({ route }: LogoutBtnProps) {
  const hideLogoutRoutes = ["/", "/signup", "/login"];
  const showLogout = !hideLogoutRoutes.includes(route);
  return showLogout
    ? (
      <button
        class="btn btn-ghost "
        onClick={() => {
          alert("Logged out");
          document.location.href = "/api/logout";
        }}
      >
        <LogoutIcon
          class="stroke-current w-7 h-7"
          aria-label="Logout"
        />
      </button>
    )
    : null;
}
