import { useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

const OG_IMAGE_URL =
  "https://og.railway.app/api/image?fileType=png&layoutName=Simple&theme=dark&text=Join%20Globetrotter!&subtitle=Test%20your%20geography%20knowledge%20in%20this%20exciting%20game!&left=%230037ff&right=%23ff0909";

const InvitePageView = () => {
  const router = useRouter();
  const { from, score } = router.query;

  useEffect(() => {
    // Redirect to home with challenge params
    const timer = setTimeout(() => {
      router.push({
        pathname: "/",
        query: {
          challenge: "true",
          from: from,
          score: score,
        },
      });
    }, 100);

    return () => clearTimeout(timer);
  }, [router, from, score]);

  const description = `Someone has challenged you to play Globetrotter. Can you beat their score?`;

  return (
    <>
      <Head>
        <title>Join Globetrotter - Challenge Accepted!</title>
        <meta name="description" content={description} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={`${process.env.NEXT_PUBLIC_BASE_URL}/play/invite`}
        />
        <meta
          property="og:title"
          content="Join Globetrotter - Challenge Accepted!"
        />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={OG_IMAGE_URL} />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:url"
          content={`${process.env.NEXT_PUBLIC_BASE_URL}/play/invite`}
        />
        <meta
          property="twitter:title"
          content="Join Globetrotter - Challenge Accepted!"
        />
        <meta property="twitter:description" content={description} />
        <meta property="twitter:image" content={OG_IMAGE_URL} />
      </Head>
    </>
  );
};

export default InvitePageView;
