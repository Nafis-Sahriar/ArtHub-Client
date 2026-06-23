import { stripe } from '@/lib/stripe';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { CircleCheckFill, Envelope, ArrowLeft } from '@gravity-ui/icons';
import { createSubscription } from '@/lib/actions/subscriptions';
import SessionRefresher from '@/Components/billing/SessionRefresher';


export default async function Success({ searchParams }) {
    const { session_id } = await searchParams;

    if (!session_id)
        throw new Error('Please provide a valid session_id (`cs_test_...`)');

    const {
        status,
        customer_details: { email: customerEmail },
        metadata
    } = await stripe.checkout.sessions.retrieve(session_id, {
        expand: ['line_items', 'payment_intent']
    });

    if (status === 'open') {
        return redirect('/');
    }

    if (status === 'complete') {
     // will update the user Table here to reflect the new plan. Just write a patch to update the user in user collection to user_plan

      const subsInfo ={
        email: customerEmail,
        planId: metadata.planId,
      }

      const result = await createSubscription(subsInfo);
    //   console.log("Subscription Creation Result:", result);

    

    
    
    

        return (
            <div className="w-full min-h-screen bg-[#F4F7F0] text-[#11140E] flex flex-col justify-center items-center p-6 select-none">

                <SessionRefresher planId={metadata.planId} />
               
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-72 h-72 bg-[#718355]/20 rounded-full blur-[100px] pointer-events-none" />

                <section
                    id="success"
                    className="relative max-w-md w-full bg-white border border-[#CFE1B9]/50 rounded-2xl p-8 shadow-xl text-center overflow-hidden animate-in fade-in-50 slide-in-from-bottom-4 duration-500"
                >
                 
                    <div className="w-16 h-16 bg-[#E9F5DB] text-[#718355] rounded-full flex items-center justify-center mx-auto mb-6 border border-[#CFE1B9]/50 shadow-[0_0_24px_rgba(113,131,85,0.15)]">
                        <CircleCheckFill className="w-8 h-8 text-[#718355]" />
                    </div>

                
                    <h1 className="text-2xl font-extrabold text-[#11140E] tracking-tight mb-2">
                        Payment Successful!
                    </h1>
                    <p className="text-gray-500 text-sm leading-relaxed mb-6">
                        We appreciate your business! Your account features have been provisioned and your plan is now active.
                    </p>

                
                    <div className="bg-[#F4F7F0] border border-[#CFE1B9] rounded-xl p-4 text-left space-y-3.5 text-xs mb-8">
                        <div className="flex items-start gap-2.5">
                            <Envelope className="w-4 h-4 text-[#97A97C] shrink-0 mt-0.5" />
                            <div>
                                <span className="block font-semibold text-gray-500 mb-0.5">Confirmation Email</span>
                                <span className="text-[#11140E] font-medium break-all">{customerEmail}</span>
                            </div>
                        </div>

                        <div className="border-t border-[#CFE1B9]/60 pt-3 flex flex-col gap-1 text-gray-500">
                            <span>Have billing questions or need custom configuration support?</span>
                            <a
                                href="mailto:orders@example.com"
                                className="text-[#718355] hover:text-[#5A6B42] font-semibold inline-flex items-center transition"
                            >
                                orders@example.com
                            </a>
                        </div>
                    </div>

              
                    <div className="space-y-3">
                        <Link
                            href="/dashboard/buyer/billing"
                            className="block w-full text-center text-xs font-semibold px-4 py-3 bg-[#718355] hover:bg-[#5A6B42] text-white rounded-xl shadow-lg shadow-[#718355]/20 transition duration-200"
                        >
                            Go to Your Plans 
                        </Link>

                        <Link
                            href="/"
                            className="inline-flex items-center justify-center gap-1.5 text-xs font-medium text-gray-500 hover:text-[#11140E] py-1 transition"
                        >
                            <ArrowLeft className="w-3.5 h-3.5" />
                            Return to Homepage
                        </Link>
                    </div>
                </section>
            </div>
        );
    }
}