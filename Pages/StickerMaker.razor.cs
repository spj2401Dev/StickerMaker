using Microsoft.AspNetCore.Components.Forms;
using Microsoft.JSInterop;
using System.Globalization;

namespace StickerMaker.Pages
{
    public partial class StickerMaker
    {
        private string uploadedImageUrl = string.Empty;
        private string backgroundImageUrl = string.Empty;
        private string uploadError = string.Empty;
        private string backgroundError = string.Empty;
        private double stickerWidth = 50; // mm
        private double stickerHeight = 50; // mm
        private double spacingX = 2; // mm
        private double spacingY = 2; // mm
        private double margin = 10; // mm
        private bool isRound = false;
        private bool isPageGenerated = false;
        private int totalStickers = 0;
        private int stickersPerRow = 0;
        private int totalRows = 0;
        private int originalWidth = 0;
        private int originalHeight = 0;
        private long fileSize = 0;
        private long backgroundFileSize = 0;
        private string selectedPreset = "medium";
        private double zoomLevel = 0.5;

        // A4 dimensions in mm
        private const double A4_WIDTH = 210;
        private const double A4_HEIGHT = 297;

        private void SetZoomLevel(double zoom)
        {
            zoomLevel = zoom;
            StateHasChanged();
        }

        private string GetZoomClass()
        {
            return zoomLevel switch
            {
                0.3 => "zoom-30",
                0.5 => "zoom-50",
                0.7 => "zoom-70",
                _ => ""
            };
        }

        private async Task HandleImageUpload(InputFileChangeEventArgs e)
        {
            uploadError = string.Empty;
            var file = e.File;

            if (file != null)
            {
                try
                {
                    if (file.Size > 10 * 1024 * 1024)
                    {
                        uploadError = "File size must be less than 10MB";
                        return;
                    }

                    if (!file.ContentType.StartsWith("image/"))
                    {
                        uploadError = "Please upload a valid image file";
                        return;
                    }

                    fileSize = file.Size;
                    var buffer = new byte[file.Size];
                    await file.OpenReadStream(maxAllowedSize: 10 * 1024 * 1024).ReadAsync(buffer);

                    var base64 = Convert.ToBase64String(buffer);
                    uploadedImageUrl = $"data:{file.ContentType};base64,{base64}";

                    originalWidth = 0;
                    originalHeight = 0;

                    isPageGenerated = false;
                    StateHasChanged();
                }
                catch (Exception ex)
                {
                    uploadError = $"Error uploading file: {ex.Message}";
                }
            }
        }

        private async Task HandleBackgroundImageUpload(InputFileChangeEventArgs e)
        {
            backgroundError = string.Empty;
            var file = e.File;

            if (file != null)
            {
                try
                {
                    if (file.Size > 10 * 1024 * 1024) // 10 MB
                    {
                        backgroundError = "File size must be less than 10MB";
                        return;
                    }

                    if (!file.ContentType.StartsWith("image/"))
                    {
                        backgroundError = "Please upload a valid image file";
                        return;
                    }

                    backgroundFileSize = file.Size;
                    var buffer = new byte[file.Size];
                    await file.OpenReadStream(maxAllowedSize: 10 * 1024 * 1024).ReadAsync(buffer);

                    var base64 = Convert.ToBase64String(buffer);
                    backgroundImageUrl = $"data:{file.ContentType};base64,{base64}";

                    StateHasChanged();
                }
                catch (Exception ex)
                {
                    backgroundError = $"Error uploading background file: {ex.Message}";
                }
            }
        }

        private void ApplyPreset()
        {
            switch (selectedPreset)
            {
                case "small":
                    stickerWidth = stickerHeight = 30;
                    isRound = false;
                    break;
                case "medium":
                    stickerWidth = stickerHeight = 50;
                    isRound = false;
                    break;
                case "large":
                    stickerWidth = stickerHeight = 70;
                    isRound = false;
                    break;
                case "round_small":
                    stickerWidth = stickerHeight = 25;
                    isRound = true;
                    break;
                case "round_medium":
                    stickerWidth = stickerHeight = 40;
                    isRound = true;
                    break;
                case "rectangle":
                    stickerWidth = 60;
                    stickerHeight = 40;
                    isRound = false;
                    break;
            }

            if (isPageGenerated)
            {
                GenerateStickers();
            }
        }

        private void UpdatePreview()
        {
            if (isPageGenerated)
            {
                GenerateStickers();
            }
        }

        private void GenerateStickers()
        {
            if (string.IsNullOrEmpty(uploadedImageUrl)) return;

            var availableWidth = A4_WIDTH - (2 * margin);
            var availableHeight = A4_HEIGHT - (2 * margin);

            stickersPerRow = (int)Math.Floor((availableWidth + spacingX) / (stickerWidth + spacingX));
            totalRows = (int)Math.Floor((availableHeight + spacingY) / (stickerHeight + spacingY));

            totalStickers = stickersPerRow * totalRows;
            isPageGenerated = true;

            StateHasChanged();
        }

        private (double offsetX, double offsetY) GetCenteringOffsets()
        {
            var totalUsedWidth = (stickersPerRow * stickerWidth) + ((stickersPerRow - 1) * spacingX);
            var totalUsedHeight = (totalRows * stickerHeight) + ((totalRows - 1) * spacingY);

            var offsetX = (A4_WIDTH - totalUsedWidth) / 2;
            var offsetY = (A4_HEIGHT - totalUsedHeight) / 2;

            return (offsetX, offsetY);
        }

        private string GetA4Style()
        {
            return "";
        }

        private string GetStickerStyle(int index)
        {
            if (stickersPerRow == 0) return "display: none;";
            
            var row = index / stickersPerRow;
            var col = index % stickersPerRow;

            var (offsetX, offsetY) = GetCenteringOffsets();

            var x = offsetX + col * (stickerWidth + spacingX);
            var y = offsetY + row * (stickerHeight + spacingY);

            return $"left: {x.ToString("F1", CultureInfo.InvariantCulture)}mm; top: {y.ToString("F1", CultureInfo.InvariantCulture)}mm; width: {stickerWidth.ToString("F1", CultureInfo.InvariantCulture)}mm; height: {stickerHeight.ToString("F1", CultureInfo.InvariantCulture)}mm;";
        }

        private string GetPrintStickerStyle(int index)
        {
            if (stickersPerRow == 0) return "display: none;";
            
            var row = index / stickersPerRow;
            var col = index % stickersPerRow;

            var (offsetX, offsetY) = GetCenteringOffsets();

            var x = offsetX + col * (stickerWidth + spacingX);
            var y = offsetY + row * (stickerHeight + spacingY);

            return $"left: {x.ToString("F1", CultureInfo.InvariantCulture)}mm; top: {y.ToString("F1", CultureInfo.InvariantCulture)}mm; width: {stickerWidth.ToString("F1", CultureInfo.InvariantCulture)}mm; height: {stickerHeight.ToString("F1", CultureInfo.InvariantCulture)}mm;";
        }

        private string GetImageStyle()
        {
            return $"width: 100%; height: 100%; object-fit: {(isRound ? "cover" : "contain")};";
        }

        private async Task PrintBothPages()
        {
            await JSRuntime.InvokeVoidAsync("printStickerPages");
        }

        private async Task PrintMainPageOnly()
        {
            await JSRuntime.InvokeVoidAsync("printStickerPage", "main");
        }

        private async Task PrintBackgroundPageOnly()
        {
            await JSRuntime.InvokeVoidAsync("printStickerPage", "background");
        }

        private async Task TestPrintLayout()
        {
            var result = await JSRuntime.InvokeAsync<bool>("testPrintLayout");
            // Result will be logged to console
        }

        private async Task DebugShowPrint()
        {
            await JSRuntime.InvokeVoidAsync("debugShowPrintContainer");
        }

        private async Task DebugShowBackground()
        {
            await JSRuntime.InvokeVoidAsync("debugShowBackgroundContainer");
        }

        private async Task DebugPrintContainers()
        {
            var result = await JSRuntime.InvokeAsync<object>("debugPrintContainers");
        }
    }
}