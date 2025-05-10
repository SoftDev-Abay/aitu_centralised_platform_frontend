import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

function SearchBar() {
  return (
    <div className="relative w-full max-w-[312px] h-12">
      <Search className="absolute left-4.5 top-1/2  w-4  -translate-y-1/2 " />
      <Input
        type="search"
        placeholder="Search..."
        className="pl-12.5 h-12 py-3 bg-brand-gray-bluish rounded-none border-none outline-none"
      />
    </div>
  );
}

export default SearchBar;
