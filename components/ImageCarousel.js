import { Dimensions, Image, ScrollView } from "react-native";

export function ImageCarousel({ uris }) {
    return (
        <ScrollView
            style={{
                flexGrow: 1,
                flexDirection: "row",
                overflow: "scroll",
            }}
            horizontal
        >
            {uris.map((uri) => {
                return (
                    <Image
                        key={uri}
                        style={{
                            flexGrow: 1,
                            borderRadius: 6,
                            width: Dimensions.get("screen").width - 40,
                            marginRight: 10,
                        }}
                        source={{ uri: uri }}
                    />
                );
            })}
        </ScrollView>
    );
}
