import { useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

const OG_IMAGE_URL =
  "https://og.railway.app/api/image?fileType=png&layoutName=Simple&theme=dark&text=Join%20Destination%20Quest!&subtitle=Test%20your%20geography%20knowledge%20in%20this%20exciting%20game!&left=%230037ff&right=%23ff0909";

const InvitePage = () => {
  const router = useRouter();

  useEffect(() => {
    // Redirect to home after a short delay
    const timer = setTimeout(() => {
      router.push("/");
    }, 100);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <>
      <Head>
        <title>Join Destination Quest - Challenge Accepted!</title>
        <meta
          name="description"
          content="Your friend has challenged you to a game of Destination Quest. Can you guess the destinations faster?"
        />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={`${process.env.NEXT_PUBLIC_BASE_URL}/play/invite`}
        />
        <meta
          property="og:title"
          content="Join Destination Quest - Challenge Accepted!"
        />
        <meta
          property="og:description"
          content="Your friend has challenged you to a game of Destination Quest. Can you guess the destinations faster?"
        />
        <meta property="og:image" content={OG_IMAGE_URL} />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:url"
          content={`${process.env.NEXT_PUBLIC_BASE_URL}/play/invite`}
        />
        <meta
          property="twitter:title"
          content="Join Destination Quest - Challenge Accepted!"
        />
        <meta
          property="twitter:description"
          content="Your friend has challenged you to a game of Destination Quest. Can you guess the destinations faster?"
        />
        <meta property="twitter:image" content={OG_IMAGE_URL} />
      </Head>
    </>
  );
};

export default InvitePage;
