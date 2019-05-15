package pl.hycom.surveyservice.model;

import java.util.List;

public class ViewPage {
    private Statistics statistics;
    private List<Survey> pages;

    public ViewPage(int surveysAmount, int pagesAmount, List<Survey> pages) {
        this.statistics = new Statistics(surveysAmount, pagesAmount);
        this.pages = pages;
    }

    public Statistics getStatistics() {
        return statistics;
    }

    public void setStatistics(Statistics statistics) {
        this.statistics = statistics;
    }

    public List<Survey> getPages() {
        return pages;
    }

    public void setPages(List<Survey> pages) {
        this.pages = pages;
    }

    public class Statistics {
        private int surveysAmount;
        private int pagesAmount;

        public Statistics(int surveysAmount, int pagesAmount) {
            this.surveysAmount = surveysAmount;
            this.pagesAmount = pagesAmount;
        }

        public int getSurveysAmount() {
            return surveysAmount;
        }

        public void setSurveysAmount(int surveysAmount) {
            this.surveysAmount = surveysAmount;
        }

        public int getPagesAmount() {
            return pagesAmount;
        }

        public void setPagesAmount(int pagesAmount) {
            this.pagesAmount = pagesAmount;
        }
    }
}
