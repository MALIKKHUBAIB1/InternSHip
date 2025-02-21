import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { Link, useNavigate } from "react-router-dom"; // 🔥 useNavigate import kiya
import { useState, useEffect } from "react";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate(); // 🔥 useNavigate hook

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    try {
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Invalid JSON in localStorage:", error);
      localStorage.removeItem("user");
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login"); // 🔥 Logout ke baad login page pe redirect
  };

  return (
    <header className="w-full border-b bg-white shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link to="/" className="text-xl font-bold text-gray-900">
          Lesson Planner
        </Link>

        <nav className="hidden md:flex space-x-6">
          <Link to="/" className="text-gray-700 hover:text-gray-900">
            Home
          </Link>
          <Link to="/about" className="text-gray-700 hover:text-gray-900">
            About
          </Link>
          <Link to="/lesson" className="text-gray-700 hover:text-gray-900">
            Lesson
          </Link>
          {user ? (
            <Button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 px-4 py-2"
            >
              Logout
            </Button>
          ) : (
            <Link
              to="/login"
              className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded"
            >
              Login
            </Link>
          )}
        </nav>

        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="flex flex-col space-y-4 mt-6">
              <Link to="/" className="text-gray-700 hover:text-gray-900">
                Home
              </Link>
              <Link to="/about" className="text-gray-700 hover:text-gray-900">
                About
              </Link>
              <Link to="/lesson" className="text-gray-700 hover:text-gray-900">
                Lesson
              </Link>
              {user ? (
                <Button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 px-4 py-2"
                >
                  Logout
                </Button>
              ) : (
                <Link
                  to="/login"
                  className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded"
                >
                  Login
                </Link>
              )}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
