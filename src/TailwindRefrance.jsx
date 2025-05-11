function TailwindRefrance() {
  return (
    // Screen
    <div className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl xxl:text-4xl">
      Responsive Text Size
      {/* Colors  */}
      <div>
        <div className="bg-primary text-white p-4">Primary Background</div>
        <div className="bg-secondary text-white p-4 mt-2">
          Secondary Background
        </div>
        <div className="text-success">Success Text</div>
        <div className="text-danger">Danger Text</div>
        <div className="border border-border p-2">Border Color</div>{" "}
      </div>
      {/*  Font Family */}
      <div>
        <p className="font-sans">This is Inter (sans)</p>
        <p className="font-serif">This is Merriweather (serif)</p>
        <p className="font-mono">This is Fira Code (mono)</p>
      </div>
      {/* Animations */}
      <div>
        <div className="animate-fadeIn">Fade In</div>
        <div className="animate-moveRight inline-block mt-4">Wiggle Horizontal</div>
      </div>
      {/* Background Patterns */}
      <div>
        <div className="h-32 bg-gradient-radial from-primary via-white to-secondary">
          Radial Gradient Background
        </div>
        <div className="h-32 bg-gradient-conic from-primary via-white to-secondary mt-4">
          Conic Gradient Background
        </div>
      </div>
      {/* Flex */}
      <div>
        <div className="flex items-center justify-center h-32 bg-light">
          Flex Centered Content
        </div>
      </div>
      {/* Forms plugin:*/}
      <div>
        <input
          type="text"
          className="form-input border border-border p-2 rounded"
          placeholder="Enter name"
        />
      </div>
      {/* Typography plugin:*/}
      <div>
         
        <article className="prose lg:prose-xl">
          <h1>Tailwind Typography</h1>
          <p>This paragraph has automatic styles from the typography plugin.</p>
        </article>
      </div>
      
    </div>
  );
}

export default TailwindRefrance;
