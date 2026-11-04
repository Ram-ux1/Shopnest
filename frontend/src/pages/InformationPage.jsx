import { Link, useParams } from "react-router-dom";

const information = {
  contact: {
    title: "Contact Shopnest",
    paragraphs: [
      "For order updates, sign in and open your profile to view your orders.",
      "For other support, configure VITE_SUPPORT_EMAIL for this deployment.",
    ],
  },
  faq: {
    title: "Frequently Asked Questions",
    paragraphs: [
      "Create an account to check out and view your order history.",
      "Use SHOP10 in your cart for 10% off eligible merchandise. Shipping is free on orders of ₹999 or more; otherwise it is ₹49.",
      "Orders are placed using the delivery address entered at checkout. You can view order status from your profile.",
    ],
  },
  shipping: {
    title: "Shipping",
    paragraphs: [
      "Shipping is free when the merchandise subtotal is ₹999 or more. Orders below that threshold have a ₹49 shipping charge.",
      "Enter a complete delivery address at checkout. Order status updates are available from your profile.",
    ],
  },
  returns: {
    title: "Returns and refunds",
    paragraphs: [
      "Online return and refund requests are not available in this version of Shopnest.",
      "Contact the store support email configured for this deployment and include your order ID so the team can assist.",
    ],
  },
  "refund-policy": {
    title: "Refund policy",
    paragraphs: [
      "Shopnest does not currently provide an online refund workflow. Refund eligibility and processing must be confirmed by the store operator.",
      "Contact the store support email configured for this deployment and include your order ID.",
    ],
  },
  "privacy-policy": {
    title: "Privacy policy",
    paragraphs: [
      "Shopnest stores account names and email addresses, hashed passwords, delivery addresses and order details. Newsletter sign-ups store the submitted email address.",
      "Passwords are stored as bcrypt hashes. Admin users can view customer and order information to operate the store.",
    ],
  },
  terms: {
    title: "Terms and conditions",
    paragraphs: [
      "Product availability and prices are confirmed by the store when an order is placed. The server calculates the order total and checks inventory at checkout.",
      "Provide an accurate delivery address and use only an account you are authorized to access. Order status is managed by the store administrator.",
    ],
  },
};

const InformationPage = () => {
  const { page } = useParams();
  const content = information[page];
  if (!content) {
    return (
      <main className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold">Page not found</h1>
        <Link className="mt-4 inline-block underline" to="/">Return home</Link>
      </main>
    );
  }

  const supportEmail = import.meta.env.VITE_SUPPORT_EMAIL;
  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-extrabold text-[#24564D]">{content.title}</h1>
      <div className="mt-6 space-y-4 text-gray-700 leading-7">
        {content.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      </div>
      {page === "contact" || page === "returns" || page === "refund-policy" ? (
        supportEmail ? (
          <a className="mt-5 inline-block font-semibold underline" href={`mailto:${supportEmail}`}>
            Email support
          </a>
        ) : (
          <p role="status" className="mt-5 text-sm text-amber-800">Support email is not configured.</p>
        )
      ) : null}
      <Link className="mt-8 inline-block font-semibold underline" to="/shop">Continue shopping</Link>
    </main>
  );
};

export default InformationPage;
