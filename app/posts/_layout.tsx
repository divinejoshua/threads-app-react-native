import { Stack } from "expo-router";

const PostLayout = () => {
    return ( 
        <Stack>
            <Stack.Screen name="[id]" options={{ presentation: "modal" }} />

        </Stack>
     );
}
 
export default PostLayout;