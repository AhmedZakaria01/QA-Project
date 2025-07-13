import pageNotFoundImage from "../../../src/assets/page_not_found.png";
function PageNotFound() {
  return (
    // 56px is the navbar height
    <section className="pt-16 h-[calc(100vh-56px)] flex items-center justify-center">
      <img
        src={pageNotFoundImage}
        alt="Page Not Found"
        className="max-w-full max-h-full object-contain"
      />
    </section>
  );
}

export default PageNotFound;
