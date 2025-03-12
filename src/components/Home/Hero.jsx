import { motion } from 'framer-motion';
import CodeBlock from './CodeBlock';
import Typewriter from 'typewriter-effect';
import { useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef, useEffect } from 'react';
import { Link } from 'react-router';

const TypedCodeBlock = () => {
    return (
        <div className="text-amber-100">
            <CodeBlock
                code={
                    <Typewriter
                        options={{
                            delay: 50,
                            cursor: '|',
                            wrapperClassName: 'whitespace-pre-wrap',
                        }}
                        onInit={(typewriter) => {
                            typewriter
                                .typeString('const hunterGuide = {\n')
                                .typeString('  weapons: ["Great Sword", "Dual Blades", "Bow", "Heavy Bowgun"],\n')
                                .pauseFor(500)
                                .typeString('  monsters: ["Zinogre", "Rathalos", "Nargacuga", "Magnamalo"],\n')
                                .pauseFor(500)
                                .typeString('  skills: ["Attack Boost", "Critical Eye", "Weakness Exploit"],\n')
                                .pauseFor(500)
                                .typeString('};\n\n')
                                .typeString('console.log("Happy Hunting!");')
                                .start();
                        }}
                    />
                }
                language="javascript"
            />
        </div>
    );
};

const Hero = () => {
    // Mouse tracking สำหรับ 3D effect
    const containerRef = useRef(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const damping = 50;
    const springX = useSpring(mouseX, { damping });
    const springY = useSpring(mouseY, { damping });

    const rotateX = useTransform(springY, [-0.5, 0.5], [15, -15]);
    const rotateY = useTransform(springX, [-0.5, 0.5], [-15, 15]);

    useEffect(() => {
        const handleMouseMove = (e) => {
            const rect = containerRef.current?.getBoundingClientRect();
            if (rect) {
                const centerX = rect.x + rect.width / 2;
                const centerY = rect.y + rect.height / 2;

                mouseX.set((e.clientX - centerX) / rect.width);
                mouseY.set((e.clientY - centerY) / rect.height);
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [mouseX, mouseY]);

    return (
        <div className="relative min-h-screen flex items-center bg-cover bg-center overflow-hidden"
             style={{backgroundImage: "url('https://cdn.monsterhunterworld.com/sblobr/mhwi/images/game_kv.jpg')"}}>
            {/* พื้นหลังโทนสีน้ำตาลมินิมอล */}
            <div className="absolute inset-0 bg-gradient-to-br from-stone-900/90 via-amber-900/80 to-stone-800/90 dark:from-stone-950/90 dark:via-amber-950/80 dark:to-stone-900/90">
                <div className="absolute inset-0 backdrop-blur-md" />
                
                {/* เอฟเฟกต์แสงนุ่มนวลแบบมินิมอล */}
                <div className="absolute top-20 left-20 w-80 h-80 bg-amber-700/10 rounded-full blur-3xl" />
                <div className="absolute bottom-20 right-20 w-96 h-96 bg-stone-600/10 rounded-full blur-3xl" />
                <div className="absolute bottom-40 left-40 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl" />
                
                {/* ใช้ gradient แทนรูปเท็กซ์เจอร์เพื่อแก้ปัญหาไฟล์ไม่มี */}
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_800px_at_100%_200px,rgba(217,119,6,0.1),transparent)]" />
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_600px_at_0%_80%,rgba(217,119,6,0.1),transparent)]" />
            </div>

            {/* เส้นกริดแนวนอนแบบบางเบา */}
            <div className="absolute bottom-0 left-0 right-0 h-[40vh] z-0">
                <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_60px,rgba(217,119,6,0.05)_60px,rgba(217,119,6,0.05)_61px)]" />
            </div>

            {/* เนื้อหาหลัก */}
            <div className="relative container mx-auto px-6 py-16 md:-mt-[150px] z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="relative text-left p-8 rounded-2xl group"
                    >
                        {/* Subtle gradient border effect แบบมินิมอล */}
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-amber-600/10 to-stone-600/10 blur-xl group-hover:blur-xl transition-all duration-500" />

                        {/* Glass background แบบมินิมอล */}
                        <div className="absolute inset-0 rounded-2xl backdrop-blur-md bg-stone-900/20 dark:bg-stone-900/30 border border-amber-700/10 dark:border-amber-800/10 shadow-[0_0_30px_rgba(217,119,6,0.05)]" />

                        {/* เนื้อหาภายใน */}
                        <div className="relative">
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2, duration: 0.8 }}
                            >
                                <h1 className="text-4xl lg:text-6xl font-bold text-amber-50 mb-4 [text-wrap:balance] tracking-tight">
                                    ยินดีต้อนรับครับท่าน CEO วราวุฒิ สู่{' '}
                                    <span className="inline-block">
                                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 dark:from-amber-200 dark:via-yellow-300 dark:to-amber-400">
                                            Monster Hunter Guide - TH
                                        </span>
                                        <motion.div
                                            className="h-0.5 bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 dark:from-amber-200 dark:via-yellow-300 dark:to-amber-400 rounded-full mt-1"
                                            initial={{ scaleX: 0 }}
                                            animate={{ scaleX: 1 }}
                                            transition={{
                                                delay: 0.5,
                                                duration: 0.8,
                                            }}
                                        />
                                    </span>
                                </h1>
                            </motion.div>

                            <motion.p
                                className="text-xl text-amber-100 dark:text-amber-100 mb-8 [text-wrap:balance] leading-relaxed"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4, duration: 0.8 }}
                            >
                                คู่มือล่าที่ครอบคลุมเพื่อช่วยให้คุณกลายเป็นนักล่าที่แข็งแกร่ง
                                เรียนรู้เกี่ยวกับมอนสเตอร์ อาวุธ และเทคนิคการล่าต่างๆ
                            </motion.p>

                            <motion.div
                                className="flex flex-wrap gap-4"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6, duration: 0.8 }}
                            >
                                <motion.div
                                    whileHover={{ scale: 1.05, translateY: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Link
                                        to="/docs"
                                        className="relative group px-8 py-3 bg-gradient-to-r from-amber-800 to-amber-700 text-amber-50 rounded-lg font-medium transition-all duration-300 border border-amber-600/30"
                                    >
                                        <span className="absolute inset-0 rounded-lg bg-gradient-to-r from-amber-600 to-amber-700 blur opacity-0 group-hover:opacity-30 transition-opacity" />
                                        <span className="relative">
                                            เริ่มการล่า
                                        </span>
                                    </Link>
                                </motion.div>
                                <motion.div
                                    whileHover={{ scale: 1.05, translateY: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Link
                                        to="/docs/CSS/สกิล"
                                        className="relative group px-8 py-3 bg-transparent text-amber-200 border border-amber-700/30 rounded-lg font-medium hover:bg-amber-800/10 transition-all duration-300"
                                    >
                                        <span className="relative">
                                            ค้นหาสกิล
                                        </span>
                                    </Link>
                                </motion.div>
                            </motion.div>

                            {/* Badge แบบมินิมอล */}
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.8, duration: 0.8 }}
                                className="mt-8 inline-block"
                            >
                                <div className="px-4 py-2 bg-amber-900/20 border border-amber-700/10 rounded-md text-amber-200 text-sm font-medium backdrop-blur-sm flex items-center">
                                    <svg className="w-5 h-5 mr-2 text-amber-400/80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M13.5 2L13.5 7L21.5 7M13.5 2L8.5 7M13.5 2L19 7.5L22 10.5L19 13.5L14 18.5L9 22L4 18.5L2 13.5L4 8.5L9 4L13.5 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                    อัพเดทล่าสุด: Monster Hunter Wilds
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>

                    <div ref={containerRef} className="perspective-1000">
                        <motion.div
                            style={{
                                rotateX,
                                rotateY,
                                transformStyle: 'preserve-3d',
                            }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.8 }}
                            className="relative"
                        >
                            {/* เอฟเฟกต์เรืองแสงแบบละเอียด */}
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-700/20 to-stone-700/20 rounded-lg blur opacity-20 group-hover:opacity-30 transition-opacity" />

                            {/* เนื้อหาหลัก 2 - โค้ด */}
                            <div className="relative backdrop-blur-xl bg-stone-900/40 dark:bg-stone-900/60 p-4 rounded-lg border border-amber-700/20 dark:border-amber-800/20 shadow-md">
                                {/* องค์ประกอบลอยตัว 3 มิติ */}
                                <div
                                    className="absolute -left-4 -top-4 w-8 h-8 bg-amber-700/20 rounded-md transform rotate-12"
                                    style={{ transform: 'translateZ(40px) rotate(12deg)' }}
                                />
                                <div
                                    className="absolute -right-6 -bottom-6 w-12 h-12 bg-amber-600/20 rounded-md transform -rotate-12"
                                    style={{ transform: 'translateZ(60px) rotate(-12deg)' }}
                                />

                                {/* เส้นกริดบางๆ แบบมินิมอล */}
                                <div className="absolute inset-0 rounded-lg overflow-hidden opacity-10 pointer-events-none">
                                    <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,transparent,transparent_50px,rgba(217,119,6,0.3)_50px,rgba(217,119,6,0.3)_51px)]" />
                                    <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_50px,rgba(217,119,6,0.3)_50px,rgba(217,119,6,0.3)_51px)]" />
                                </div>

                                {/* เนื้อหาภายในโค้ด */}
                                <motion.div
                                    style={{ transform: 'translateZ(30px)' }}
                                    className="relative z-10"
                                >
                                    <TypedCodeBlock />
                                </motion.div>
                            </div>
                        </motion.div>

                        {/* Icon แบบมินิมอล */}
                        <motion.div
                            className="absolute -bottom-8 -right-8 w-24 h-24 transform rotate-12 opacity-60"
                            initial={{ opacity: 0, rotate: 0 }}
                            animate={{ opacity: 0.6, rotate: 12 }}
                            transition={{ delay: 1.2, duration: 0.8 }}
                        >
                            {/* ไม่ใช้ SVG แบบเดิม แต่ใช้รูปจาก URL */}
                            <div className="w-full h-full relative">
                                <img 
                                    src="https://monsterhunterworld.wiki.fextralife.com/file/Monster-Hunter-World/mhw-guild-crest-wiki-guide.png" 
                                    alt="Monster Hunter Icon" 
                                    className="w-full h-full object-contain opacity-70"
                                />
                                <div className="absolute inset-0" style={{ filter: "drop-shadow(0 0 5px rgba(217,119,6,0.3))" }}></div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;
