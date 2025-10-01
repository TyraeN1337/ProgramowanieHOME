namespace Wzornik
{
    public partial class MainPage : ContentPage
    {
        int count = 0;

        public MainPage()
        {
            InitializeComponent();
            UpdatePreviewAndNumbers();
        }

        void OnSliderChanged(object sender, ValueChangedEventArgs e)
        {
            // Zaokrąglamy do całych wartości 0–255 (żeby liczby były ładne)
            SnapSliderToInt(SliderR);
            SnapSliderToInt(SliderG);
            SnapSliderToInt(SliderB);

            UpdatePreviewAndNumbers();
        }

        void SnapSliderToInt(Slider s)
        {
            var rounded = Math.Max(0, Math.Min(255, Math.Round(s.Value)));
            if (Math.Abs(rounded - s.Value) > double.Epsilon)
                s.Value = rounded;
        }

        void UpdatePreviewAndNumbers()
        {
            int r = (int)SliderR.Value;
            int g = (int)SliderG.Value;
            int b = (int)SliderB.Value;

            LabelR.Text = r.ToString();
            LabelG.Text = g.ToString();
            LabelB.Text = b.ToString();

            PreviewBox.Color = Color.FromRgb((byte)r, (byte)g, (byte)b);
        }

        void OnClicked(object sender, EventArgs e)
        {
            int r = (int)SliderR.Value;
            int g = (int)SliderG.Value;
            int b = (int)SliderB.Value;

            SavedBox.Color = Color.FromRgb((byte)r, (byte)g, (byte)b);
            SavedLabel.Text = $"{r}, {g}, {b}";
        }
    }
}
