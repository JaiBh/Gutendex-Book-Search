import { BookOpen } from "lucide-react";
import ModeToggle from "./ModeToggle";

function Navbar() {
  return (
    <nav>
      <div className="section-center flex items-center justify-between border-b py-8">
        <div className="flex items-center gap-4">
          <BookOpen></BookOpen>
          <h2 className="text-lg md:text-xl lg:text-2xl font-bold">
            Gutendex Book Search
          </h2>
        </div>
        <ModeToggle></ModeToggle>
      </div>
    </nav>
  );
}
export default Navbar;
