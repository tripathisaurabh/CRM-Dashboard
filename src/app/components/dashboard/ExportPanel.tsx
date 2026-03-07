import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { FileDown, Send } from "lucide-react";

export function ExportPanel() {
  return (
    <Card className="shadow-sm">
      <CardHeader className="p-4 sm:p-6 pb-3 sm:pb-4">
        <CardTitle className="text-base sm:text-lg truncate">Export & Marketing Sync</CardTitle>
        <p className="text-xs sm:text-sm text-gray-500">
          Export segments or sync to marketing platforms
        </p>
      </CardHeader>
      <CardContent className="p-4 sm:p-6 pt-0">
        <div className="space-y-2 sm:space-y-3">
          {/* CSV Export */}
          <div className="p-3 sm:p-4 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors">
            <div className="flex items-center justify-between gap-2 sm:gap-3">
              <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                <div className="p-1.5 sm:p-2 bg-gray-100 rounded-lg flex-shrink-0">
                  <FileDown className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                </div>
                <div className="min-w-0">
                  <p className="font-medium text-gray-900 text-sm sm:text-base truncate">Export to CSV</p>
                  <p className="text-xs text-gray-500 truncate">
                    Download customer data as CSV file
                  </p>
                </div>
              </div>
              <Button variant="outline" size="sm" className="text-xs sm:text-sm whitespace-nowrap">
                Export
              </Button>
            </div>
          </div>

          {/* ActiveCampaign */}
          <div className="p-3 sm:p-4 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors">
            <div className="flex items-center justify-between gap-2 sm:gap-3">
              <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                <div className="p-1.5 sm:p-2 bg-blue-100 rounded-lg flex-shrink-0">
                  <Send className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                </div>
                <div className="min-w-0">
                  <p className="font-medium text-gray-900 text-sm sm:text-base truncate">Push to ActiveCampaign</p>
                  <p className="text-xs text-gray-500 truncate">
                    Sync segment to ActiveCampaign list
                  </p>
                </div>
              </div>
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-xs sm:text-sm whitespace-nowrap">
                <Send className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                Push
              </Button>
            </div>
          </div>

          {/* Omnisend */}
          <div className="p-3 sm:p-4 rounded-lg border border-gray-200 hover:border-purple-300 transition-colors">
            <div className="flex items-center justify-between gap-2 sm:gap-3">
              <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                <div className="p-1.5 sm:p-2 bg-purple-100 rounded-lg flex-shrink-0">
                  <Send className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
                </div>
                <div className="min-w-0">
                  <p className="font-medium text-gray-900 text-sm sm:text-base truncate">Push to Omnisend</p>
                  <p className="text-xs text-gray-500 truncate">
                    Sync segment to Omnisend audience
                  </p>
                </div>
              </div>
              <Button size="sm" className="bg-purple-600 hover:bg-purple-700 text-xs sm:text-sm whitespace-nowrap">
                <Send className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                Push
              </Button>
            </div>
          </div>

          {/* Drip */}
          <div className="p-3 sm:p-4 rounded-lg border border-gray-200 hover:border-green-300 transition-colors">
            <div className="flex items-center justify-between gap-2 sm:gap-3">
              <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                <div className="p-1.5 sm:p-2 bg-green-100 rounded-lg flex-shrink-0">
                  <Send className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                </div>
                <div className="min-w-0">
                  <p className="font-medium text-gray-900 text-sm sm:text-base truncate">Push to Drip</p>
                  <p className="text-xs text-gray-500 truncate">
                    Sync segment to Drip campaign
                  </p>
                </div>
              </div>
              <Button size="sm" className="bg-green-600 hover:bg-green-700 text-xs sm:text-sm whitespace-nowrap">
                <Send className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                Push
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}