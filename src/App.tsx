import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Products from "./pages/Products";
import ProductTalentNest from "./pages/ProductTalentNest";
import ProductTenantNest from "./pages/ProductTenantNest";
import ProductHotelAI from "./pages/ProductHotelAI";
import RecruitingContracting from "./pages/RecruitingContracting";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import SignIn from "./pages/hotel-ai/SignIn";
import SignUp from "./pages/hotel-ai/SignUp";
import Onboarding from "./pages/hotel-ai/Onboarding";
import { DashboardLayout } from "./components/hotel-ai/DashboardLayout";
import Overview from "./pages/hotel-ai/dashboard/Overview";
import Revenue from "./pages/hotel-ai/dashboard/Revenue";
import Reviews from "./pages/hotel-ai/dashboard/Reviews";
import Housekeeping from "./pages/hotel-ai/dashboard/Housekeeping";
import Forecasting from "./pages/hotel-ai/dashboard/Forecasting";
import Staff from "./pages/hotel-ai/dashboard/Staff";
import Settings from "./pages/hotel-ai/dashboard/Settings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Main Website Routes */}
          <Route path="/" element={<><Navigation /><Home /><Footer /></>} />
          <Route path="/about" element={<><Navigation /><About /><Footer /></>} />
          <Route path="/products" element={<><Navigation /><Products /><Footer /></>} />
          <Route path="/products/talentnest" element={<><Navigation /><ProductTalentNest /><Footer /></>} />
          <Route path="/products/tenantnest" element={<><Navigation /><ProductTenantNest /><Footer /></>} />
          <Route path="/products/hotel-ai" element={<><Navigation /><ProductHotelAI /><Footer /></>} />
          <Route path="/recruiting-contracting" element={<><Navigation /><RecruitingContracting /><Footer /></>} />
          <Route path="/services" element={<><Navigation /><Services /><Footer /></>} />
          <Route path="/contact" element={<><Navigation /><Contact /><Footer /></>} />
          
          {/* Hotel AI Auth Routes */}
          <Route path="/hotel-ai/signin" element={<SignIn />} />
          <Route path="/hotel-ai/signup" element={<SignUp />} />
          <Route path="/hotel-ai/onboarding" element={<Onboarding />} />
          
          {/* Hotel AI Dashboard Routes */}
          <Route path="/hotel-ai/dashboard" element={<DashboardLayout />}>
            <Route index element={<Overview />} />
            <Route path="revenue" element={<Revenue />} />
            <Route path="reviews" element={<Reviews />} />
            <Route path="housekeeping" element={<Housekeeping />} />
            <Route path="forecasting" element={<Forecasting />} />
            <Route path="staff" element={<Staff />} />
            <Route path="settings" element={<Settings />} />
          </Route>
          
          {/* 404 Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
