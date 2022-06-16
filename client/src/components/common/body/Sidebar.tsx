import Categories from "./Categories";
import SliderFilter from "./SliderFilter";

interface SidebarProps {}

const Sidebar = (props: SidebarProps) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Categories />
      <SliderFilter />
    </div>
  );
};

export default Sidebar;
