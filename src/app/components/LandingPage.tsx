import { ArrowRight, BarChart3, CheckCircle2, Gift, LogIn, MessageCircle, Music2, Play, Radio, ShieldCheck, Sparkles, Users, Video } from "lucide-react";
import logo from "../../assets/logo.png";

export function LandingPage({ onLogin }: { onLogin: () => void }) {
  return (
    <div className="min-h-screen overflow-hidden bg-[#070b12] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_15%,rgba(132,204,22,0.18),transparent_32%),radial-gradient(circle_at_15%_80%,rgba(28,79,96,0.24),transparent_34%)]" />
      <div className="relative mx-auto max-w-7xl px-6 pb-16 pt-6 lg:px-10">
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-3"><img src={logo} alt="Play" className="size-11 object-contain" /><span className="text-2xl font-bold">Play</span></div>
          <button onClick={onLogin} className="rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold transition hover:border-[#B9F45B] hover:text-[#B9F45B]"><LogIn className="mr-2 inline size-4" />Log in</button>
        </header>

        <main>
          <section className="grid items-center gap-12 pb-20 pt-20 lg:grid-cols-[1.08fr_.92fr] lg:pt-28">
            <div>
              <div className="mb-6 inline-flex rounded-full border border-[#B9F45B]/30 bg-[#B9F45B]/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-[#B9F45B]">Create · Connect · Play</div>
              <h1 className="max-w-3xl text-5xl font-bold leading-[1.03] tracking-tight sm:text-6xl lg:text-7xl">Your world. Your people. Your Play.</h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">Share moments, discover creators, join live conversations, and build a community that feels like home.</p>
              <div className="mt-9 flex flex-wrap gap-4"><button onClick={onLogin} className="rounded-full bg-[#B9F45B] px-6 py-4 font-bold text-[#10170a] shadow-[0_0_35px_rgba(185,244,91,.2)] transition hover:bg-[#d1ff7d]">Start creating <ArrowRight className="ml-2 inline size-4" /></button><button onClick={onLogin} className="rounded-full border border-white/20 px-6 py-4 font-semibold transition hover:border-white/50">Open dashboard</button></div>
              <div className="mt-10 flex gap-8 text-sm"><div><b className="block text-xl">10K+</b><span className="text-slate-400">Creators</span></div><div><b className="block text-xl">24/7</b><span className="text-slate-400">Live moments</span></div><div><b className="block text-xl">1 place</b><span className="text-slate-400">To belong</span></div></div>
            </div>
            <div className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-4 shadow-2xl"><div className="rounded-[1.5rem] bg-gradient-to-br from-[#203b4a] to-[#14212c] p-7"><div className="flex items-center justify-between text-sm text-slate-200"><span>Today on Play</span><span className="rounded-full bg-[#B9F45B] px-3 py-1 text-xs font-bold text-[#10170a]">LIVE</span></div><div className="mt-12 flex h-52 items-center justify-center rounded-3xl bg-[#2c5360]"><div className="flex size-24 items-center justify-center rounded-full border-4 border-[#B9F45B]/70 bg-[#1c3540]"><Play className="ml-1 size-10 fill-[#B9F45B] text-[#B9F45B]" /></div></div><h2 className="mt-6 text-2xl font-bold">Find your next moment</h2><p className="mt-2 leading-6 text-slate-300">A fresh feed of stories, live rooms, sounds, and people worth discovering.</p></div></div>
          </section>
          <section className="border-t border-white/10 py-16">
            <div className="max-w-2xl"><p className="text-sm font-bold uppercase tracking-[0.2em] text-[#B9F45B]">One app, many ways to play</p><h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Everything you need to create, connect, and grow.</h2><p className="mt-4 leading-7 text-slate-400">Play brings the tools of a social community into one simple space—so you can share your voice, discover new people, and stay close to the moments that matter.</p></div>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"><InfoCard icon={<Video />} title="Share stories and videos" text="Post short-form moments, updates, and creative work with your community." /><InfoCard icon={<Radio />} title="Go live together" text="Join live rooms, meet new people, and turn conversations into shared experiences." /><InfoCard icon={<MessageCircle />} title="Chat and stay connected" text="Message friends and communities with simple, reliable conversations." /><InfoCard icon={<Music2 />} title="Discover sounds" text="Find music and sounds that help your stories and videos feel like you." /><InfoCard icon={<Gift />} title="Support creators" text="Engage with creators through gifts, coins, and meaningful community support." /><InfoCard icon={<BarChart3 />} title="Build your creator journey" text="Track your progress, manage your presence, and grow with the people who follow you." /></div>
          </section>
          <section className="grid gap-8 rounded-[2rem] border border-[#B9F45B]/15 bg-[#B9F45B]/[0.06] p-7 md:grid-cols-[.8fr_1.2fr] md:p-10"><div><p className="text-sm font-bold uppercase tracking-[0.2em] text-[#B9F45B]">How it works</p><h2 className="mt-3 text-3xl font-bold">Your first moment is only a few steps away.</h2></div><div className="grid gap-5 sm:grid-cols-3"><Step number="01" title="Create an account" text="Sign up or log in with your email." /><Step number="02" title="Find your space" text="Follow people, explore content, and join live rooms." /><Step number="03" title="Make it yours" text="Share, connect, and build your community." /></div></section>
          <section className="grid gap-4 border-t border-white/10 pt-8 md:grid-cols-3"><Feature icon={<Sparkles />} title="Express yourself" text="Create videos, stories, and moments that feel unmistakably yours." /><Feature icon={<Users />} title="Find your people" text="Connect with creators and communities around the things you love." /><Feature icon={<ShieldCheck />} title="Your space" text="Tools, controls, and support designed around your experience." /></section>
          <section className="mt-16 rounded-[2rem] bg-gradient-to-r from-[#1b3541] to-[#17221f] p-8 text-center md:p-12"><p className="text-sm font-bold uppercase tracking-[0.2em] text-[#B9F45B]">Ready when you are</p><h2 className="mx-auto mt-3 max-w-2xl text-3xl font-bold sm:text-4xl">Bring your next idea, conversation, or connection to Play.</h2><p className="mx-auto mt-4 max-w-xl leading-7 text-slate-300">Join a welcoming space built for real people, creative energy, and everyday moments.</p><button onClick={onLogin} className="mt-7 rounded-full bg-[#B9F45B] px-7 py-4 font-bold text-[#10170a] transition hover:bg-[#d1ff7d]">Join Play <ArrowRight className="ml-2 inline size-4" /></button></section>
          <section className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6 text-sm text-slate-500"><span>© {new Date().getFullYear()} Play</span><span><CheckCircle2 className="mr-1 inline size-4 text-[#B9F45B]" />Made for real connections.</span></section>
        </main>
      </div>
    </div>
  );
}

function Feature({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return <div className="rounded-3xl border border-white/10 bg-white/[0.05] p-5"><div className="size-6 text-[#B9F45B]">{icon}</div><h3 className="mt-5 text-lg font-bold">{title}</h3><p className="mt-2 leading-6 text-slate-400">{text}</p></div>;
}

function InfoCard({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return <div className="rounded-3xl border border-white/10 bg-[#0d141d]/80 p-5 transition hover:-translate-y-1 hover:border-[#B9F45B]/30"><div className="flex size-10 items-center justify-center rounded-2xl bg-[#B9F45B]/10 text-[#B9F45B]">{icon}</div><h3 className="mt-5 font-bold">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-400">{text}</p></div>;
}

function Step({ number, title, text }: { number: string; title: string; text: string }) {
  return <div><span className="text-sm font-bold text-[#B9F45B]">{number}</span><h3 className="mt-2 font-bold">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-400">{text}</p></div>;
}
