/*

When to Avoid Re-Renders
Repeatedly Setting the Same State Value:

Avoid setting the same state value inside a component repeatedly; it can cause needless re-renders.
Complex Components with Heavy Calculations:

Avoid rerendering in components with complex calculations. Consider using useMemo or React.memo to memoize values and components.
Updating Parent Component Too Often:

If a parent component re-renders frequently, its children also re-render. useCallback helps prevent passing in-line functions to child components, which avoids unnecessary renders.
Let me know if you'd like any more details on rendering techniques!

*/







import React from 'react'
import BeveragesP from '../../presentational/beveragesP/BeveragesP'

function BeveragesC() {
  return (
    <div>BeveragesC
<BeveragesP/>
    </div>
  )
}

export default BeveragesC
