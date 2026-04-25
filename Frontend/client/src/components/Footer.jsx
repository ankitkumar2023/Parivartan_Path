import React from "react";
import { Link } from "react-router-dom";
import { HeartPulse, Mail, MapPin, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-white/10 dark:border-slate-700 bg-blue-950 dark:bg-slate-900 text-white">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-500/15 ring-1 ring-emerald-400/20">
                <HeartPulse className="h-5 w-5 text-emerald-300" />
              </span>
              <div>
                <p className="text-sm font-semibold tracking-wide text-white dark:text-slate-100">Parivartan Path</p>
                <p className="text-xs text-white/70 dark:text-slate-400">Drug Rehabilitation & Recovery Center</p>
              </div>
            </div>
            <p className="mt-4 max-w-xl text-sm leading-6 text-white/75 dark:text-slate-300">
              A calm, confidential, and clinically guided path to recovery. Our multidisciplinary team supports patients
              and families with evidence-based care and dignity-first treatment.
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold text-white dark:text-slate-100">Quick Links</p>
            <ul className="mt-4 space-y-2 text-sm text-white/75 dark:text-slate-300">
              <li>
                <Link className="transition hover:text-white dark:hover:text-slate-100" to="/">
                  Home
                </Link>
              </li>
              <li>
                <Link className="transition hover:text-white dark:hover:text-slate-100" to="/services">
                  Services
                </Link>
              </li>
              <li>
                <Link className="transition hover:text-white dark:hover:text-slate-100" to="/contact">
                  Contact
                </Link>
              </li>
              <li>
                <Link className="transition hover:text-white dark:hover:text-slate-100" to="/login">
                  Patient Login
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold text-white dark:text-slate-100">Contact</p>
            <ul className="mt-4 space-y-3 text-sm text-white/75 dark:text-slate-300">
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 text-amber-300" />
                <span>Sant nagar Jhiri , P.S - Ratu, PO - Kamre, Ranchi , Jharkhand - 835222</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-amber-300" />
                <span>9113193968</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-amber-300" />
                <span>6204899258</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-amber-300" />
                <span>ParivartanpathFoundation24@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-white/10 dark:border-slate-700 pt-6 text-xs text-white/60 dark:text-slate-400 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Parivartan Path. All rights reserved.</p>
          <p>Privacy-first • Confidential care • 24/7 Support</p>
        </div>
      </div>
    </footer>
  );
}

