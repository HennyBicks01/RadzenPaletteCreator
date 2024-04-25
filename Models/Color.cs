namespace RadzenPaletteMaker.Models
{
    public class ThemeColor
    {
        public string BaseColor { get; set; }
        public string Description { get; set; }
    }

    public class BaseColorTheme
    {
        public string Base500 { get; set; }
        public Dictionary<string, string> Shades { get; set; } = new Dictionary<string, string>();

        public void ComputeShades()
        {
            // Assuming Base500 is in the middle, compute other shades
            Shades["--rz-base-50"] = ColorHelper.LightenColor(Base500, 0.9);
            Shades["--rz-base-100"] = ColorHelper.LightenColor(Base500, 0.8);
            Shades["--rz-base-200"] = ColorHelper.LightenColor(Base500, 0.6);
            Shades["--rz-base-300"] = ColorHelper.LightenColor(Base500, 0.4);
            Shades["--rz-base-400"] = ColorHelper.LightenColor(Base500, 0.2);
            Shades["--rz-base-500"] = Base500;
            Shades["--rz-base-600"] = ColorHelper.DarkenColor(Base500, 0.2);
            Shades["--rz-base-700"] = ColorHelper.DarkenColor(Base500, 0.4);
            Shades["--rz-base-800"] = ColorHelper.DarkenColor(Base500, 0.6);
            Shades["--rz-base-900"] = ColorHelper.DarkenColor(Base500, 0.8);
        }
    }


    public static class ColorHelper
    {

        // Function to lighten a color
        public static string LightenColor(string color, double factor, bool returnAsRgba = false, float alpha = 1.0f)
        {
            var (r, g, b) = ParseColor(color);
            r = (int)(r + (255 - r) * factor);
            g = (int)(g + (255 - g) * factor);
            b = (int)(b + (255 - b) * factor);

            if (returnAsRgba)
                return $"rgba({r},{g},{b},{alpha})";
            return $"#{r:X2}{g:X2}{b:X2}";
        }

        // Function to darken a color
        public static string DarkenColor(string color, double factor, bool returnAsRgba = false, float alpha = 1.0f)
        {
            var (r, g, b) = ParseColor(color);
            r = (int)(r * (1 - factor));
            g = (int)(g * (1 - factor));
            b = (int)(b * (1 - factor));

            if (returnAsRgba)
                return $"rgba({r},{g},{b},{alpha})";
            return $"#{r:X2}{g:X2}{b:X2}";
        }

        // Parses both HEX and RGB colors
        private static (int, int, int) ParseColor(string color)
        {
            if (color.StartsWith("#"))
            {
                if (color.Length == 7)
                {
                    var r = int.Parse(color.Substring(1, 2), System.Globalization.NumberStyles.HexNumber);
                    var g = int.Parse(color.Substring(3, 2), System.Globalization.NumberStyles.HexNumber);
                    var b = int.Parse(color.Substring(5, 2), System.Globalization.NumberStyles.HexNumber);
                    return (r, g, b);
                }
                throw new ArgumentException("Unsupported color format");
            }
            else if (color.StartsWith("rgb"))
            {
                return ParseRgb(color);
            }
            throw new ArgumentException("Unsupported color format");
        }

        private static (int, int, int) ParseRgb(string rgb)
        {
            var parts = rgb.Substring(rgb.IndexOf('(') + 1, rgb.IndexOf(')') - rgb.IndexOf('(') - 1).Split(',');
            return (
                int.Parse(parts[0].Trim()),
                int.Parse(parts[1].Trim()),
                int.Parse(parts[2].Trim())
            );
        }
    }




}
