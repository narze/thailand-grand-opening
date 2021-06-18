import React, { useEffect, useMemo, useCallback } from "react";
import { Line } from "progressbar.js";

const Progress = ({ animate }: { animate: number }) => {
  const wrapper = document.createElement("div");
  // wrapper.
  const bar = useMemo(() => {
    return new Line(wrapper as unknown as SVGPathElement, {
      color: "#FFEA82",
      trailColor: "#444444",
      trailWidth: 1,
      duration: 3000,
      easing: "bounce",
      strokeWidth: 3,
      from: { color: "#FFEA82" },
      to: { color: "#FF3A2A" },
      step: function (state, line) {
        line.path!.setAttribute("stroke", state.color);
      },
    });
  }, []);

  const node = useCallback((node) => {
    if (node) {
      node.appendChild(wrapper);
    }
  }, []);

  useEffect(() => {
    bar.animate(animate);
  }, [animate, bar]);

  return <div ref={node} id="progress" />;
};

export default Progress;
