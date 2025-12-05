export function BackgroundSplit() {
    return (
        <div className="absolute inset-0 flex">
            {/* Left Side - Science/Nature Theme (Inspired by Montpellier Tram Line 5) */}
            <div className="w-1/2 bg-gradient-to-br from-amber-50 via-emerald-100 to-lime-50 relative overflow-hidden">
                {/* Base colors - beige/cream background */}
                <div className="absolute inset-0 bg-gradient-to-br from-stone-100 via-emerald-50 to-amber-50"></div>

                {/* Abstract trees - Line 5 style */}
                <div className="absolute inset-0">
                    {/* Tree 1 - Left */}
                    <div className="absolute bottom-0 left-[10%]">
                        {/* Trunk */}
                        <div className="w-12 h-40 bg-gradient-to-t from-amber-800 to-amber-700 rounded-t-full"></div>
                        {/* Canopy - abstract circles */}
                        <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-32 h-32 bg-emerald-600 rounded-full opacity-70"></div>
                        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-24 h-24 bg-lime-500 rounded-full opacity-60"></div>
                        <div className="absolute -top-12 left-1/2 -translate-x-1/2 translate-x-8 w-20 h-20 bg-green-600 rounded-full opacity-65"></div>
                    </div>

                    {/* Tree 2 - Center */}
                    <div className="absolute bottom-0 left-[40%]">
                        {/* Trunk */}
                        <div className="w-16 h-56 bg-gradient-to-t from-stone-700 to-amber-600 rounded-t-full"></div>
                        {/* Canopy - abstract organic shapes */}
                        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-40 h-40 bg-green-700 rounded-full opacity-75"></div>
                        <div className="absolute -top-28 left-1/2 -translate-x-1/2 -translate-x-4 w-32 h-32 bg-emerald-500 rounded-full opacity-70"></div>
                        <div className="absolute -top-20 left-1/2 -translate-x-1/2 translate-x-10 w-28 h-28 bg-lime-600 rounded-full opacity-65"></div>
                        <div className="absolute -top-16 left-1/2 -translate-x-1/2 -translate-x-12 w-24 h-24 bg-green-600 rounded-full opacity-60"></div>
                    </div>

                    {/* Tree 3 - Right */}
                    <div className="absolute bottom-0 right-[15%]">
                        {/* Trunk */}
                        <div className="w-10 h-36 bg-gradient-to-t from-amber-900 to-stone-600 rounded-t-full"></div>
                        {/* Canopy */}
                        <div className="absolute -top-14 left-1/2 -translate-x-1/2 w-28 h-28 bg-emerald-700 rounded-full opacity-70"></div>
                        <div className="absolute -top-18 left-1/2 -translate-x-1/2 translate-x-6 w-22 h-22 bg-lime-600 rounded-full opacity-65"></div>
                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 -translate-x-8 w-20 h-20 bg-green-500 rounded-full opacity-60"></div>
                    </div>

                    {/* Smaller background trees */}
                    <div className="absolute top-[30%] left-[25%] w-20 h-20 bg-green-600/40 rounded-full"></div>
                    <div className="absolute top-[35%] left-[22%] w-6 h-16 bg-amber-700/40 rounded-t-full"></div>

                    <div className="absolute top-[25%] right-[30%] w-24 h-24 bg-emerald-600/35 rounded-full"></div>
                    <div className="absolute top-[31%] right-[29%] w-7 h-20 bg-stone-700/35 rounded-t-full"></div>

                    <div className="absolute top-[45%] left-[70%] w-18 h-18 bg-lime-600/40 rounded-full"></div>
                    <div className="absolute top-[49%] left-[69%] w-5 h-14 bg-amber-800/40 rounded-t-full"></div>
                </div>

                {/* Leaves floating */}
                <div className="absolute inset-0">
                    <div className="absolute top-[20%] left-[30%] w-8 h-8 bg-emerald-500 rounded-full opacity-50 rotate-45"></div>
                    <div className="absolute top-[40%] right-[25%] w-6 h-6 bg-lime-600 rounded-full opacity-45 -rotate-12"></div>
                    <div className="absolute top-[60%] left-[50%] w-7 h-7 bg-green-600 rounded-full opacity-40 rotate-90"></div>
                    <div className="absolute top-[15%] right-[40%] w-5 h-5 bg-emerald-600 rounded-full opacity-50"></div>
                    <div className="absolute top-[70%] left-[35%] w-6 h-6 bg-lime-500 rounded-full opacity-45 rotate-180"></div>
                </div>

                {/* Abstract organic patterns */}
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-10 left-20 w-16 h-16 border-4 border-green-700 rounded-full"></div>
                    <div className="absolute bottom-40 right-32 w-20 h-20 border-4 border-emerald-600 rounded-full"></div>
                    <div className="absolute top-1/3 right-1/4 w-12 h-12 border-3 border-lime-600 rounded-full"></div>
                </div>

                {/* Soft overlay for depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-stone-200/30 via-transparent to-emerald-100/20"></div>

                {/* Digital/Tech elements */}
                <div className="absolute inset-0">
                    {/* Binary code floating */}
                    <div className="absolute top-[15%] left-[15%] text-emerald-700 opacity-40 font-mono">
                        01101
                    </div>
                    <div className="absolute top-[25%] right-[20%] text-green-800 opacity-35 font-mono">
                        11010
                    </div>
                    <div className="absolute top-[50%] left-[25%] text-lime-700 opacity-40 font-mono">
                        10011
                    </div>
                    <div className="absolute top-[65%] right-[35%] text-emerald-600 opacity-30 font-mono">
                        00110
                    </div>
                    <div className="absolute top-[35%] left-[60%] text-green-700 opacity-35 font-mono">
                        11100
                    </div>
                    <div className="absolute top-[80%] left-[45%] text-lime-600 opacity-40 font-mono">
                        01010
                    </div>

                    {/* Stylized squares and pixels */}
                    <div className="absolute top-[18%] right-[15%] w-6 h-6 border-2 border-emerald-600 opacity-50 rotate-45"></div>
                    <div className="absolute top-[42%] left-[35%] w-8 h-8 border-2 border-green-700 opacity-45 rotate-12"></div>
                    <div className="absolute top-[58%] right-[25%] w-7 h-7 border-2 border-lime-600 opacity-40 -rotate-12"></div>
                    <div className="absolute top-[72%] left-[55%] w-5 h-5 border-2 border-emerald-700 opacity-50 rotate-90"></div>

                    {/* Pixel grid patterns */}
                    <div className="absolute top-[28%] left-[45%] grid grid-cols-3 gap-1 opacity-40">
                        <div className="w-2 h-2 bg-green-600"></div>
                        <div className="w-2 h-2 bg-emerald-600"></div>
                        <div className="w-2 h-2 bg-lime-600"></div>
                        <div className="w-2 h-2 bg-emerald-600"></div>
                        <div className="w-2 h-2 bg-green-600"></div>
                        <div className="w-2 h-2 bg-emerald-600"></div>
                        <div className="w-2 h-2 bg-lime-600"></div>
                        <div className="w-2 h-2 bg-emerald-600"></div>
                        <div className="w-2 h-2 bg-green-600"></div>
                    </div>

                    <div className="absolute top-[55%] right-[40%] grid grid-cols-2 gap-1 opacity-35">
                        <div className="w-3 h-3 bg-lime-700"></div>
                        <div className="w-3 h-3 bg-green-700"></div>
                        <div className="w-3 h-3 bg-green-700"></div>
                        <div className="w-3 h-3 bg-emerald-700"></div>
                    </div>

                    {/* Tech symbols */}
                    <div className="absolute top-[22%] left-[50%] text-green-700 opacity-40 text-xl">
                        &lt;/&gt;
                    </div>
                    <div className="absolute top-[48%] right-[18%] text-emerald-600 opacity-35 text-lg">
                        &#123; &#125;
                    </div>
                    <div className="absolute top-[68%] left-[20%] text-lime-700 opacity-40 text-lg">
                        [ ]
                    </div>

                    {/* Circuit-like lines */}
                    <svg
                        className="absolute top-[30%] right-[30%] w-24 h-24 opacity-25"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <line
                            x1="0"
                            y1="12"
                            x2="24"
                            y2="12"
                            stroke="#059669"
                            strokeWidth="2"
                        />
                        <circle cx="24" cy="12" r="3" fill="#059669" />
                        <line
                            x1="24"
                            y1="12"
                            x2="24"
                            y2="36"
                            stroke="#059669"
                            strokeWidth="2"
                        />
                        <circle cx="24" cy="36" r="3" fill="#10b981" />
                    </svg>

                    <svg
                        className="absolute top-[60%] left-[65%] w-20 h-20 opacity-30"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <line
                            x1="10"
                            y1="0"
                            x2="10"
                            y2="20"
                            stroke="#65a30d"
                            strokeWidth="2"
                        />
                        <circle cx="10" cy="20" r="3" fill="#65a30d" />
                        <line
                            x1="10"
                            y1="20"
                            x2="30"
                            y2="20"
                            stroke="#84cc16"
                            strokeWidth="2"
                        />
                        <circle cx="30" cy="20" r="3" fill="#84cc16" />
                    </svg>
                </div>
            </div>

            {/* Right Side - American Theme */}
            <div className="w-1/2 relative overflow-hidden">
                {/* American flag stripes */}
                <div className="absolute inset-0">
                    <div className="absolute top-0 left-0 right-0 h-[7.69%] bg-red-600"></div>
                    <div className="absolute top-[7.69%] left-0 right-0 h-[7.69%] bg-white"></div>
                    <div className="absolute top-[15.38%] left-0 right-0 h-[7.69%] bg-red-600"></div>
                    <div className="absolute top-[23.07%] left-0 right-0 h-[7.69%] bg-white"></div>
                    <div className="absolute top-[30.76%] left-0 right-0 h-[7.69%] bg-red-600"></div>
                    <div className="absolute top-[38.45%] left-0 right-0 h-[7.69%] bg-white"></div>
                    <div className="absolute top-[46.14%] left-0 right-0 h-[7.69%] bg-red-600"></div>
                    <div className="absolute top-[53.83%] left-0 right-0 h-[7.69%] bg-white"></div>
                    <div className="absolute top-[61.52%] left-0 right-0 h-[7.69%] bg-red-600"></div>
                    <div className="absolute top-[69.21%] left-0 right-0 h-[7.69%] bg-white"></div>
                    <div className="absolute top-[76.9%] left-0 right-0 h-[7.69%] bg-red-600"></div>
                    <div className="absolute top-[84.59%] left-0 right-0 h-[7.69%] bg-white"></div>
                    <div className="absolute top-[92.28%] left-0 right-0 h-[7.69%] bg-red-600"></div>
                </div>

                {/* Opacity overlay to soften the pattern */}
                <div className="absolute inset-0 bg-gradient-to-br from-red-600/60 via-transparent to-red-700/60"></div>

                {/* Data Centers and Pollution */}
                <div className="absolute inset-0">
                    {/* Data Center 1 - Left */}
                    <div className="absolute bottom-0 left-[15%]">
                        {/* Building */}
                        <div className="w-24 h-48 bg-gradient-to-t from-gray-800 to-gray-700 border-2 border-gray-900 relative">
                            {/* Server racks pattern */}
                            <div className="absolute inset-2 grid grid-cols-3 gap-1">
                                {Array.from({ length: 12 }).map((_, i) => (
                                    <div
                                        key={i}
                                        className="bg-blue-400 opacity-60 border border-cyan-300"
                                    ></div>
                                ))}
                            </div>
                            {/* Ventilation lines */}
                            <div className="absolute bottom-2 left-0 right-0 space-y-1 px-2">
                                <div className="h-0.5 bg-gray-600"></div>
                                <div className="h-0.5 bg-gray-600"></div>
                                <div className="h-0.5 bg-gray-600"></div>
                            </div>
                        </div>

                        {/* Smoke stack */}
                        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-6 h-16 bg-gray-700 border-2 border-gray-800"></div>

                        {/* Pollution smoke */}
                        <div className="absolute -top-16 left-1/2 -translate-x-1/2">
                            <div className="w-16 h-12 bg-gray-500 rounded-full opacity-70 blur-sm"></div>
                            <div className="absolute -top-8 left-2 w-20 h-14 bg-gray-400 rounded-full opacity-60 blur-md"></div>
                            <div className="absolute -top-14 left-4 w-18 h-12 bg-gray-500 rounded-full opacity-50 blur-lg"></div>
                        </div>
                    </div>

                    {/* Data Center 2 - Center Right */}
                    <div className="absolute bottom-0 right-[25%]">
                        {/* Building - larger */}
                        <div className="w-32 h-56 bg-gradient-to-t from-slate-900 to-slate-700 border-2 border-gray-900 relative">
                            {/* Server racks pattern */}
                            <div className="absolute inset-2 grid grid-cols-4 gap-1">
                                {Array.from({ length: 20 }).map((_, i) => (
                                    <div
                                        key={i}
                                        className="bg-red-400 opacity-60 border border-red-300"
                                    ></div>
                                ))}
                            </div>
                            {/* LED indicators */}
                            <div className="absolute top-2 left-2 flex gap-1">
                                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                            </div>
                        </div>

                        {/* Smoke stack */}
                        <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-8 h-20 bg-gray-700 border-2 border-gray-900"></div>

                        {/* Heavy pollution smoke */}
                        <div className="absolute -top-20 left-1/2 -translate-x-1/2">
                            <div className="w-20 h-16 bg-gray-600 rounded-full opacity-75 blur-sm"></div>
                            <div className="absolute -top-10 left-1 w-24 h-18 bg-gray-500 rounded-full opacity-70 blur-md"></div>
                            <div className="absolute -top-18 left-3 w-22 h-16 bg-gray-600 rounded-full opacity-60 blur-lg"></div>
                            <div className="absolute -top-24 left-5 w-20 h-14 bg-gray-500 rounded-full opacity-50 blur-xl"></div>
                        </div>
                    </div>

                    {/* Smaller data center - right */}
                    <div className="absolute bottom-0 right-[8%]">
                        <div className="w-20 h-40 bg-gradient-to-t from-gray-900 to-gray-700 border-2 border-gray-900 relative">
                            <div className="absolute inset-2 grid grid-cols-2 gap-1">
                                {Array.from({ length: 10 }).map((_, i) => (
                                    <div
                                        key={i}
                                        className="bg-cyan-400 opacity-60 border border-cyan-300"
                                    ></div>
                                ))}
                            </div>
                        </div>

                        {/* Small smoke */}
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2">
                            <div className="w-12 h-10 bg-gray-500 rounded-full opacity-65 blur-sm"></div>
                            <div className="absolute -top-6 left-1 w-14 h-10 bg-gray-400 rounded-full opacity-55 blur-md"></div>
                        </div>
                    </div>

                    {/* Floating pollution clouds */}
                    <div className="absolute top-[25%] left-[20%] w-32 h-20 bg-gray-400 rounded-full opacity-40 blur-lg"></div>
                    <div className="absolute top-[35%] right-[30%] w-28 h-16 bg-gray-500 rounded-full opacity-35 blur-md"></div>
                    <div className="absolute top-[15%] right-[15%] w-24 h-14 bg-gray-400 rounded-full opacity-30 blur-lg"></div>
                    <div className="absolute top-[50%] left-[35%] w-20 h-12 bg-gray-500 rounded-full opacity-35 blur-md"></div>

                    {/* Binary code and tech elements - industrial style */}
                    <div className="absolute top-[20%] left-[25%] text-red-700 opacity-50 font-mono">
                        11111
                    </div>
                    <div className="absolute top-[30%] right-[20%] text-blue-800 opacity-45 font-mono">
                        00000
                    </div>
                    <div className="absolute top-[45%] left-[40%] text-gray-700 opacity-50 font-mono">
                        10101
                    </div>
                    <div className="absolute top-[55%] right-[35%] text-red-600 opacity-40 font-mono">
                        01110
                    </div>

                    {/* Server rack icons scattered */}
                    <div className="absolute top-[28%] left-[50%] w-6 h-8 border-2 border-gray-700 opacity-40">
                        <div className="h-1 bg-red-500 mt-1"></div>
                        <div className="h-1 bg-blue-500 mt-1"></div>
                        <div className="h-1 bg-green-500 mt-1"></div>
                    </div>

                    <div className="absolute top-[60%] right-[25%] w-5 h-7 border-2 border-gray-700 opacity-35">
                        <div className="h-1 bg-red-500 mt-0.5"></div>
                        <div className="h-1 bg-blue-500 mt-0.5"></div>
                        <div className="h-1 bg-green-500 mt-0.5"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}