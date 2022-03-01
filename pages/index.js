import ContextProvider from "../context/context";
import AuthContextProvider from "../context/authContext";
import FirebaseContextProvider from "../context/firebaseContext";
import Head from "next/head";
import Body from "../components/Body";
import Script from "next/script";

function index() {
  return (
    <FirebaseContextProvider>
      <AuthContextProvider>
        <ContextProvider>
          <Head>
            <title>Colornonym : Find the right one!</title>
            <meta name="keywords" content="colornonym , color-blind" />
            <meta name="author" content="SornchaiTheDev" />
            <meta name="user-scalable" content="no" />
            <meta
              name="description"
              content="Let's find the color that different from the others"
            />
            <meta name="color-scheme" content="dark light" />
            <meta name="og:title" content="Let's Find the right color!" />
            <meta
              name="og:description"
              content="Let's find the color that different from the others"
            />
            <meta
              name="og:image"
              content="https://colornonym.s3.ap-southeast-1.amazonaws.com/Colornonym.png?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaDmFwLXNvdXRoZWFzdC0xIkYwRAIgKYYmLK43Qc%2Fdf02DL7MOVKyyggc61pe%2FZE3kr22kkeMCIGmKxg8xxZfujkLfqE6yWkiBeOcEWcKWq%2FohJDtUFccBKuQCCBQQABoMMDA2MzU2ODgzMDQxIgylX58UAyKyHVwMOo8qwQIuWWe5Bu%2B9j4pbPkpS79w8lFRrREaG3yahRpzeq9%2B8CdUgZZQgEWD%2BRnFEbNnSQ4at%2BgH4u772xiPK3yekhHLhjvJB5A3xRm9Xh93GymSTE87FlpDwL%2Bwb2%2FGadw4Hq8STCqZAv%2B6F5Z5baGv56%2FHwQEQkCfqAFVYf701IrUQlNv6vt0NuZheMFt6SGkfyMJP8IUfH0J8JsBRGOlOa4aCnaoK%2BBvdins%2FyM%2BreKKEG%2B35doOqfHpulfJwlNCOh%2FG3AHhHBHgDI91mjCoBCr3vJGlrvousfzxSg6%2FjitHXikmXfDhKDJr7KcM6Cth7YoA8qTBXmsQxWTlm%2BetkfZRvTDcDDfoCNLaxXP32wSo32HJb4TXybrHxqg7t39IvorSJ5X0nq%2BtQ0hHC1RZW%2FWieadvIiprXjdhUeCq48n0K%2BimEwpv73kAY6tAKHRAexhRtwR%2F4CQGqOaE6bL1kSbh3sXgqSiq8SO4T07djD%2Fdx7eDglst5Uz3La2ZBUEpFp2Y7KNEoAT7dKw5tetpfPoGgbTlfEmRe%2Fo53s3AlNT%2FNSnQHdIxzH4%2FiLxVh8rbXYtVUtbACO6%2BlmPCy1J1%2BRUmxV5cRqboirordn2zJ7c1C6kacVCfhXuup01SXJEA%2F6zjwMr%2B29PLX3%2F8VGi7C%2BJa4xIhHsLUP4RIFpKK6pKHcVHNwDNxCsXAQXjuMHBZI8rpa%2FHueLQmISau0%2F1TIZ5NAOIph3EycxSYHcu8AASqYX5IfRKOUjyqMqS84POZsTUdY0imG42Qz1NJe%2B%2BaVkKQcZHhhWsfrlNcxLOH0fzTF7Jo6i1Py5%2BEKMzjM1p57vHUcVntjsGSBeSGqXhf5XGw%3D%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20220301T111204Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIAQC6XGKZQ77TG73FP%2F20220301%2Fap-southeast-1%2Fs3%2Faws4_request&X-Amz-Signature=09ce38440bbeb6dbfe06c81fe0fb3512cb40e0e824f03b2d2cbc9ee258ff1a89"
            />
            <meta name="og:url" content="https://colornonym.vercel.app" />
            <meta property="og:type" content="website" />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:site" content="@sornchaithedev" />
            <meta name="twitter:creator" content="@sornchaithedev" />
            <meta name="twitter:title" content="Let's Find the right color!" />
            <meta
              name="twitter:description"
              content="Let's find the color that different from the others"
            />
            <meta
              name="twitter:image"
              content="https://colornonym.s3.ap-southeast-1.amazonaws.com/Colornonym.png?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaDmFwLXNvdXRoZWFzdC0xIkYwRAIgKYYmLK43Qc%2Fdf02DL7MOVKyyggc61pe%2FZE3kr22kkeMCIGmKxg8xxZfujkLfqE6yWkiBeOcEWcKWq%2FohJDtUFccBKuQCCBQQABoMMDA2MzU2ODgzMDQxIgylX58UAyKyHVwMOo8qwQIuWWe5Bu%2B9j4pbPkpS79w8lFRrREaG3yahRpzeq9%2B8CdUgZZQgEWD%2BRnFEbNnSQ4at%2BgH4u772xiPK3yekhHLhjvJB5A3xRm9Xh93GymSTE87FlpDwL%2Bwb2%2FGadw4Hq8STCqZAv%2B6F5Z5baGv56%2FHwQEQkCfqAFVYf701IrUQlNv6vt0NuZheMFt6SGkfyMJP8IUfH0J8JsBRGOlOa4aCnaoK%2BBvdins%2FyM%2BreKKEG%2B35doOqfHpulfJwlNCOh%2FG3AHhHBHgDI91mjCoBCr3vJGlrvousfzxSg6%2FjitHXikmXfDhKDJr7KcM6Cth7YoA8qTBXmsQxWTlm%2BetkfZRvTDcDDfoCNLaxXP32wSo32HJb4TXybrHxqg7t39IvorSJ5X0nq%2BtQ0hHC1RZW%2FWieadvIiprXjdhUeCq48n0K%2BimEwpv73kAY6tAKHRAexhRtwR%2F4CQGqOaE6bL1kSbh3sXgqSiq8SO4T07djD%2Fdx7eDglst5Uz3La2ZBUEpFp2Y7KNEoAT7dKw5tetpfPoGgbTlfEmRe%2Fo53s3AlNT%2FNSnQHdIxzH4%2FiLxVh8rbXYtVUtbACO6%2BlmPCy1J1%2BRUmxV5cRqboirordn2zJ7c1C6kacVCfhXuup01SXJEA%2F6zjwMr%2B29PLX3%2F8VGi7C%2BJa4xIhHsLUP4RIFpKK6pKHcVHNwDNxCsXAQXjuMHBZI8rpa%2FHueLQmISau0%2F1TIZ5NAOIph3EycxSYHcu8AASqYX5IfRKOUjyqMqS84POZsTUdY0imG42Qz1NJe%2B%2BaVkKQcZHhhWsfrlNcxLOH0fzTF7Jo6i1Py5%2BEKMzjM1p57vHUcVntjsGSBeSGqXhf5XGw%3D%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20220301T111204Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIAQC6XGKZQ77TG73FP%2F20220301%2Fap-southeast-1%2Fs3%2Faws4_request&X-Amz-Signature=09ce38440bbeb6dbfe06c81fe0fb3512cb40e0e824f03b2d2cbc9ee258ff1a89"
            />
          </Head>

          <div className="flex flex-col justify-start items-center bg-primary min-h-screen ">
            <Body />
          </div>
          <Script src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js" />
        </ContextProvider>
      </AuthContextProvider>
    </FirebaseContextProvider>
  );
}

export default index;
