export default {
  categories: {
    categories: [],
    isLoading: false
  },
  subcategories: {
    assetSubCategoriesDropdown: [],
    assetSubCategories: [],
    assetSubCategoriesCount: 0,
    isLoading: false
  },
  assetTypes: [],
  assetMakes: {
    assetMake: [],
    assetMakes: [],
    assetMakesCount: 0,
    isLoading: false
  },
  modelNumbers: [],
  assetModels: [],
  assets: {
    assetsList: [],
    assetsCount: 0,
    errorMessage: '',
    hasError: false,
    isLoading: false
  },
  asset: {
    assetDetail: {},
    newAllocation: {},
    unAssignedAsset: {},
    errorMessage: '',
    hasError: false,
    isLoading: false,
    buttonLoading: false
  },
  toastMessage: {
    message: '',
    type: ''
  },
  userFeedback: {
    feedback: [],
    feedbackCount: 0,
    isLoading: false,
    hasError: false
  },
  incidenceReports: {
    reports: [],
    incidenceReportsCount: 0,
    isLoading: false,
    hasError: false
  },
  assetCategories: {
    categoriesDropdown: [],
    categories: [],
    assetCategoriesCount: 0,
    isLoading: false,
    hasError: false,
    previousUrl: '',
    nextUrl: ''
  },
  assetConditions: {
    assetConditionsList: [],
    assetConditionsCount: 0,
    isLoading: false
  },
  usersList: {
    users: [],
    assetAsigneeUsers: [],
    usersCount: 0,
    errorMessage: '',
    hasError: false,
    isLoading: false,
    securityUser: {}
  },
  user: {},
  assetSpecs: {
    specs: [],
    assetSpecsCount: 0,
    isLoading: false,
    hasError: false,
    previousUrl: '',
    nextUrl: ''
  },
  allocations: {
    allAllocations: [],
    allocationsCount: 0,
    errorMessage: '',
    hasError: false,
    isLoading: false
  },
  session: {
    sessionExpired: false
  }
};
