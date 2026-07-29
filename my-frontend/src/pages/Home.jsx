import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div className="min-h-[calc(100vh-64px)] flex flex-col items-center px-6 py-10 bg-base-100">

            {/* Hero / Carousel Section */}
            <div className="w-full max-w-6xl h-[420px] rounded-3xl border-2 border-dashed border-base-300 bg-base-200 flex items-center justify-center shadow-lg">

                {/* Replace this with DaisyUI Carousel */}
                <h2 className="text-2xl font-semibold text-base-content/50">
                    Carousel goes here
                </h2>

            </div>

            {/* Buttons */}
            <div className="mt-12 flex gap-6">

                <Link
                    to="/CreateGroup"
                    className="btn btn-primary btn-lg rounded-full px-10"
                >
                    Create Group
                </Link>

                <Link
                    to="/GroupFeed"
                    className="btn btn-outline btn-lg rounded-full px-10"
                >
                    My Groups
                </Link>

            </div>

        </div>
    );
};

export default Home;